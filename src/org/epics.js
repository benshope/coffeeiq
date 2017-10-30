/* eslint-disable no-constant-condition */
import { Observable } from "rxjs";
import { push } from "react-router-redux";

import { authActions } from "src/auth";

import { firebaseDb } from "src/firebase";
import { orgActions, orgActionTypes } from "./actions";
import { notificationsActions } from "../notifications/actions";

const invitesRefPath = (groupId, state) =>
  groupId ? `orgs/${state.auth.orgId}/groups/${groupId}/invites` : `orgs/${state.auth.orgId}/invites`;

export const orgFirebaseUpdatesEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .flatMap(({ payload: { orgId } }) => Observable.from([orgId, false]))
    .flatMap(orgId => {
      const unwrap = (value, key) => ({
        path: [orgId, key].filter(x => x).join("."),
        value
      });
      const ref = firebaseDb.ref(["orgs", orgId].filter(x => x).join("/"));
      return Observable.create(observer => {
        ref.once("value", x => observer.next(orgActions.onValue(unwrap(x.val()))));
        ref.on("child_added", x => observer.next(orgActions.onChildAdded(unwrap(x.val(), x.key))));
        ref.on("child_changed", x => observer.next(orgActions.onChildChanged(unwrap(x.val(), x.key))));
        ref.on("child_removed", x => observer.next(orgActions.onChildRemoved(unwrap(x.val(), x.key))));
      });
    });

export const toggleMembershipEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.TOGGLE_GROUP_MEMBERSHIP).flatMap(({ payload }) => {
    const state = store.getState();
    const group = (state.org[state.auth.orgId] || {}).groups[payload.groupId];
    const toggleOn = !group.userIds || !group.userIds[payload.userId];
    var updates = {};
    updates[`groups/${payload.groupId}/userIds/${payload.userId}`] = toggleOn || null;
    updates[`users/${payload.userId}/groupIds/${payload.groupId}`] = toggleOn || null;
    return new Promise((resolve, reject) =>
      firebaseDb.ref(`orgs/${state.auth.orgId}`).update(
        updates,
        error =>
          error
            ? reject(orgActions.toggleMembershipFailed({ error }))
            : resolve(
                orgActions.toggleMembershipSuccess({
                  groupName: group.name,
                  toggleOn
                })
              )
      )
    );
  });

export const toggleMembershipFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.TOGGLE_GROUP_MEMBERSHIP_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error updating group membership: ${payload.error}`
    })
  );

export const toggleMembershipSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.TOGGLE_GROUP_MEMBERSHIP_SUCCESS).map(({ payload }) =>
    notificationsActions.requestCreateSuccessNotification({
      message: payload.toggleOn
        ? `You will be scheduled for coffee with ${payload.groupName}`
        : `You are removed from group ${payload.groupName}`
    })
  );

export const createInviteEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_INVITE)
    .flatMap(({ payload }) => {
      const state = store.getState();
      const inviteId = payload.email.split(".").join("_");
      return new Promise((resolve, reject) =>
        firebaseDb.ref(invitesRefPath(payload.groupId, state) + "/" + inviteId).update(
          {
            inviterName: state.auth.displayName,
            inviterUid: state.auth.uid,
            lastInviteTime: Date.now(),
            email: payload.email
          },
          error =>
            error
              ? reject(
                  orgActions.createInviteFailed({
                    error,
                    email: payload.email
                  })
                )
              : resolve(orgActions.createInviteSuccess(payload.email))
        )
      );
    })
    .catch(error => Observable.of(orgActions.createInviteFailed({ error })));

export const createInviteFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.CREATE_INVITE_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error inviting ${payload.email}: ${payload.error}`
    })
  );

export const createInviteSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.CREATE_INVITE_SUCCESS).map(() =>
    notificationsActions.requestCreateSuccessNotification({
      message: "Invite sent"
    })
  );

export const deleteInviteEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.DELETE_INVITE)
    .flatMap(({ payload: { groupId, inviteId } }) => {
      const state = store.getState();
      return new Promise((resolve, reject) =>
        firebaseDb
          .ref(invitesRefPath(groupId, state))
          .update({ [inviteId]: null }, error => (error ? reject(error) : resolve(inviteId)))
      );
    })
    .map(inviteId => orgActions.deleteInviteSuccess(inviteId))
    .catch(error => Observable.of(orgActions.deleteInviteFailed({ error })));

export const deleteInviteFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.DELETE_INVITE_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error deleting invite: ${payload.error}`
    })
  );

export const deleteInviteSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.DELETE_INVITE_SUCCESS).map(() =>
    notificationsActions.requestCreateSuccessNotification({
      message: "Invite deleted"
    })
  );

export const resendInviteEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.RESEND_INVITE)
    .flatMap(({ payload }) => {
      const state = store.getState();
      return new Promise((resolve, reject) =>
        firebaseDb.ref(invitesRefPath(payload.groupId, state) + "/" + payload.inviteId).update(
          {
            inviterName: state.auth.displayName,
            inviterUid: state.auth.uid,
            lastInviteTime: Date.now()
          },
          error => (error ? reject(error) : resolve(payload))
        )
      );
    })
    .map(inviteId => orgActions.resendInviteSuccess(inviteId))
    .catch(error => Observable.of(orgActions.resendInviteFailed({ error })));

export const resendInviteFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.RESEND_INVITE_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error sending invite: ${payload.error}`
    })
  );

export const resendInviteSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.RESEND_INVITE_SUCCESS).map(() =>
    notificationsActions.requestCreateSuccessNotification({
      message: "Invite sent again"
    })
  );

export const createGroupEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_GROUP)
    .flatMap(({ payload }) => {
      const state = store.getState();
      const orgId = state.auth.orgId;
      return new Promise((resolve, reject) =>
        firebaseDb
          .ref(`orgs/${orgId}/groups`)
          .push(payload.value, error => error && reject(error))
          .then(snap => resolve(snap.key))
      );
    })
    .map(key => orgActions.createGroupSuccess(key))
    .catch(error => Observable.of(orgActions.createGroupFailed(error)));

export const createGroupSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.CREATE_GROUP_SUCCESS).flatMap(() =>
    Observable.from([
      notificationsActions.requestCreateSuccessNotification({
        message: "Group created"
      })
      // , push(`/group/${payload}`)
    ])
  );

export const createGroupFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.CREATE_GROUP_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error creating group: ${payload.error} `
    })
  );

export const updateGroupEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP).flatMap(({ payload }) => {
    const orgId = store.getState().auth.orgId;
    return new Promise((resolve, reject) =>
      firebaseDb.ref(`orgs/${orgId}/groups/${payload.key}`).update(
        {
          name: payload.value.name,
          location: payload.value.location
        },
        error =>
          error
            ? reject(orgActions.updateGroupFailed({ groupId: payload.key, error }))
            : resolve(orgActions.updateGroupSuccess(payload.key))
      )
    );
  });

export const updateGroupSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP_SUCCESS).map(() =>
    notificationsActions.requestCreateSuccessNotification({
      message: "Group updated"
    })
  );

export const updateGroupFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP_FAILED).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Group update error: ${payload.error} `
    })
  );

export const deleteGroupEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.DELETE_GROUP)
    .flatMap(({ payload }) => {
      const groupId = payload;
      const state = store.getState();
      let updates = {};
      updates[`groups/${groupId}`] = null;
      Object.keys((state.org[state.auth.orgId] || {}).groups[groupId].userIds || {}).forEach(userId => {
        updates[`users/${userId}/groupIds/${groupId}`] = null;
      });
      return new Promise((resolve, reject) =>
        firebaseDb.ref(`orgs/${state.auth.orgId}`).update(updates, error => (error ? reject(error) : resolve(groupId)))
      );
    })
    .map(groupId => orgActions.deleteGroupSuccess(groupId))
    .catch(error => Observable.of(orgActions.deleteGroupFailed(error)));

export const deleteGroupSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.DELETE_GROUP_SUCCESS).flatMap(({ payload }) =>
    Observable.from([
      push("/groups"),
      notificationsActions.requestCreateSuccessNotification({
        message: "Group deleted"
      })
    ])
  );

export const updateCalendarAccess = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS && action.payload.gaveCalendarAccess)
    .map(
      ({ payload }) =>
        new Promise((resolve, reject) =>
          firebaseDb.ref(`orgs/${payload.orgId}/calendarAccess`).update(
            {
              // TODO: do these expire?
              uid: payload.uid,
              // createdTime: Date.now(),
              // checkedTime: Date.now(),
              refreshToken: payload.refreshToken
            },
            error => (error ? reject(error) : resolve(payload))
          )
        )
    )
    .map(payload => orgActions.updateCalendarAccessSuccess(payload))
    .catch(error => Observable.of(orgActions.updateCalendarAccessFailed(error)));

export const updateCalendarAccessFailedEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.UPDATE_CALENDAR_ACCESS_ERROR).map(({ payload }) =>
    notificationsActions.requestCreateErrorNotification({
      message: `Error granting calendar access: ${payload}`
    })
  );

export const updateCalendarAccessSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActions.UPDATE_CALENDAR_ACCESS_SUCCESS).map(() =>
    notificationsActions.requestCreateSuccessNotification({
      message: "Calendar access granted"
    })
  );

export const orgEpics = [
  createGroupEpic,
  createGroupSuccessEpic,
  createGroupFailedEpic,
  createInviteEpic,
  createInviteFailedEpic,
  createInviteSuccessEpic,
  deleteInviteEpic,
  deleteInviteFailedEpic,
  deleteInviteSuccessEpic,
  resendInviteEpic,
  resendInviteFailedEpic,
  resendInviteSuccessEpic,
  deleteGroupEpic,
  deleteGroupSuccessEpic,
  orgFirebaseUpdatesEpic,
  updateGroupEpic,
  updateGroupSuccessEpic,
  updateGroupFailedEpic,
  updateCalendarAccess,
  updateCalendarAccessFailedEpic,
  updateCalendarAccessSuccessEpic,
  toggleMembershipEpic,
  toggleMembershipFailedEpic,
  toggleMembershipSuccessEpic
];
