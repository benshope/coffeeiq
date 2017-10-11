/* eslint-disable no-constant-condition */
import { omit } from "lodash";
import { Observable } from "rxjs";

import { authActions } from "src/auth";

import { firebaseDb } from "../firebase";
import { orgActions, orgActionTypes } from "./actions";
import { notificationsActions } from "../notifications/actions";

export const signInSuccessEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map(({ payload }) => {
      var orgId = payload.user.email.split("@")[1].replace(".", "_");
      return firebaseDb.ref(`orgs/${orgId}`);
    })
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
      return firebaseDb.ref(`orgs/${state.auth.user.orgId}`).update(updates);
    })
    .filter(() => false);
};

export const createGroupEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_GROUP)
    .flatMap(({ payload }) => {
      const orgId = store.getState().auth.user.orgId;
      return new Promise((resolve, reject) =>
        firebaseDb.ref(`orgs/${orgId}/groups`).push(payload, error => (error ? reject(error) : resolve(payload)))
      );
    })
    .map(payload => orgActions.createGroupSuccess(payload))
    .catch(error => Observable.of(orgActions.createGroupFailed(error)));

export const createGroupSuccessEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.CREATE_GROUP_SUCCESS)
    .map(({ payload }) => notificationsActions.requestCreateNotification({ message: "Group created" }));

// export const updateGroupEpic = (action$, store) =>
//   action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP).flatMap(({ payload }) => {
//     const orgId = store.getState().auth.user.orgId;
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
        firebaseDb
          .ref(`orgs/${state.auth.user.orgId}`)
          .update(updates, error => (error ? reject(error) : resolve(groupId)))
      );
    })
    .map(groupId => orgActions.deleteGroupSuccess(groupId))
    .catch(error => Observable.of(orgActions.deleteGroupFailed(error)));

export const deleteGroupSuccessEpic = (action$, store) =>
  action$
    .filter(action => action.type === orgActionTypes.DELETE_GROUP_SUCCESS)
    .map(({ payload }) => notificationsActions.requestCreateNotification({ message: "Group deleted" }));

export const orgEpics = [
  createGroupEpic,
  createGroupSuccessEpic,
  // updateGroupEpic,
  deleteGroupEpic,
  deleteGroupSuccessEpic,
  signInSuccessEpic,
  toggleMembershipEpic
];
