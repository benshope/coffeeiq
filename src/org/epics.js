/* eslint-disable no-constant-condition */
import { Observable } from "rxjs";

import { authActions } from "src/auth";

import { firebaseDb } from "../firebase";
import { orgActions, orgActionTypes } from "./actions";

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
  action$.filter(action => action.type === orgActionTypes.CREATE_GROUP).flatMap(({ payload }) => {
    const orgId = store.getState().auth.user.orgId;
    return new Promise((resolve, reject) =>
      firebaseDb
        .ref(`orgs/${orgId}/groups`)
        .push(payload, error => (error ? reject(error) : resolve(payload)))
        .then((() => orgActions.createGroupSuccess(payload), error => orgActions.createGroupFailed(error)))
    );
  });

export const updateGroupEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.UPDATE_GROUP).flatMap(({ payload }) => {
    const orgId = store.getState().auth.user.orgId;
    return new Promise((resolve, reject) =>
      firebaseDb
        .ref(`orgs/${orgId}/groups/${payload.key}`)
        .update(payload.value, error => (error ? reject(error) : resolve(payload)))
        .then((() => orgActions.updateGroupSuccess(payload), error => orgActions.updateGroupFailed(error)))
    );
  });

export const deleteGroupEpic = (action$, store) =>
  action$.filter(action => action.type === orgActionTypes.DELETE_GROUP).flatMap(({ payload }) => {
    const orgId = store.getState().auth.user.orgId;
    const groups = {
      ...store.getState().org.groups,
      [payload]: undefined
    };
    return new Promise((resolve, reject) =>
      firebaseDb
        .ref(`orgs/${orgId}/groups`)
        .set(groups, error => (error ? reject(error) : resolve(payload)))
        .then((() => orgActions.deleteGroupSuccess(payload), error => orgActions.deleteGroupFailed(error)))
    );
  });

export const orgEpics = [createGroupEpic, updateGroupEpic, deleteGroupEpic, signInSuccessEpic, toggleMembershipEpic];
