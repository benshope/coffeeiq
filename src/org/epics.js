/* eslint-disable no-constant-condition */
import { omit } from "lodash";
import { Observable } from "rxjs";
import { push } from "react-router-redux";

import { authActions } from "src/auth";

import { firebaseDb } from "../firebase";
import { orgActions, orgActionTypes } from "./actions";
import { notificationsActions } from "../notifications/actions";

export const firebaseUpdatesEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map(({ payload }) => firebaseDb.ref(`orgs/${payload.orgId}`))
    .flatMap(ref => {
      const unwrap = snapshot => ({
        path: snapshot.key,
        value: snapshot.val()
      });
      return Observable.create(observer => {
        ref.once("value", x => observer.next(orgActions.onValue(x.val())));
        ref.on("child_added", x => observer.next(orgActions.onChildAdded(unwrap(x))));
        ref.on("child_changed", x => observer.next(orgActions.onChildChanged(unwrap(x))));
        ref.on("child_removed", x => observer.next(orgActions.onChildRemoved(unwrap(x))));
      });
    });

export const toggleMembershipEpic = (action$, store) => {
  return action$
    .filter(action => action.type === orgActionTypes.TOGGLE_GROUP_MEMBERSHIP)
    .map(({ payload }) => {
      const state = store.getState();
      const group = state.org.groups[payload.groupId];
      const toggleOn = !group.userIds || !group.userIds[payload.userId];
      var updates = {};
      updates[`groups/${payload.groupId}/userIds/${payload.userId}`] = toggleOn;
      updates[`users/${payload.userId}/groupIds/${payload.groupId}`] = toggleOn;
      return firebaseDb.ref(`orgs/${state.auth.orgId}`).update(updates);
    })
    .filter(() => false); // TODO
};

export const createInviteEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_INVITE)
    .flatMap(({ payload }) => {
      const state = store.getState();
      const orgId = state.auth.orgId;
      const inviteKey = payload.replace(".", "_");
      return new Promise((resolve, reject) =>
        firebaseDb.ref(`orgs/${orgId}/invites/${inviteKey}`).update(
          {
            inviterName: state.auth.displayName,
            inviterUid: state.auth.uid,
            lastInviteTime: Date.now(),
            email: payload
          },
          error =>
            error
              ? reject(orgActions.createInviteFailed({ error, email: payload }))
              : resolve(orgActions.createInviteSuccess(payload))
        )
      );
    })
    .catch(error => Observable.of(orgActions.createInviteFailed({ error })));

export const createInviteErrorEpic = (action$, store) =>
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

export const createGroupEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_GROUP)
    .flatMap(({ payload }) => {
      const state = store.getState();
      const orgId = state.auth.orgId;
      return new Promise((resolve, reject) =>
        firebaseDb
          .ref(`orgs/${orgId}/groups`)
          .push(payload, error => error && reject(error))
          .then(snap => resolve(snap.key))
      );
    })
    .map(payload => orgActions.createGroupSuccess(payload))
    .catch(error => Observable.of(orgActions.createGroupFailed(error)));

export const createGroupSuccessEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.CREATE_GROUP_SUCCESS).flatMap(({ payload }) =>
    Observable.from([
      notificationsActions.requestCreateSuccessNotification({
        message: "Group created"
      }),
      push(`/group/${payload}`)
    ])
  );

// export const updateGroupEpic = (action$, store) =>
//   action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP).flatMap(({ payload }) => {
//     const orgId = store.getState().auth.orgId;
//     return new Promise((resolve, reject) =>
//       firebaseDb
//         .ref(`orgs/${orgId}/groups/${payload.key}`)
//         .update(payload.value, error => (error ? reject(error) : resolve(payload)))
//         .then((() => orgActions.updateGroupSuccess(payload), error => orgActions.updateGroupFailed(error)))
//     );
//   });

export const deleteGroupEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.DELETE_GROUP)
    .flatMap(({ payload }) => {
      const groupId = payload;
      const state = store.getState();
      let updates = {};
      updates[`groups`] = omit(state.org.groups, groupId);
      Object.keys(state.org.groups[groupId].userIds || {}).forEach(userId => {
        updates[`users/${userId}/groupIds`] = omit(state.org.users[userId].groupIds || {}, groupId);
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

export const updateCalendarAccessErrorEpic = (action$, store) =>
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
  createInviteEpic,
  createInviteErrorEpic,
  createInviteSuccessEpic,
  deleteGroupEpic,
  deleteGroupSuccessEpic,
  firebaseUpdatesEpic,
  updateCalendarAccess,
  updateCalendarAccessErrorEpic,
  updateCalendarAccessSuccessEpic,
  toggleMembershipEpic
];
