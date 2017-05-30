/* eslint-disable no-constant-condition */
import { Observable } from 'rxjs';

import { authActions } from 'core/auth';

import { firebaseDb } from '../firebase';
import { groupActions } from './actions';
import { groupList } from './group-list';

export const signInSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map((payload) => {
      // console.log('signInSuccessEpic', payload);
      var orgId = payload.payload.authUser.email.split('@')[1].replace('.', '_');
      groupList.path = `orgs/${orgId}/groups`;
      return groupList.actionStream();
    })
    .flatMap(x => x);
};

export const createGroupEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.CREATE_GROUP)
    .map((action) => {
      return groupList.push(action.payload);
    })
    .filter(() => false);
};

export const toggleGroupMembershipEpic = (action$, store) => {
  return action$
    .filter((action) => action.type === groupActions.TOGGLE_GROUP_MEMBERSHIP)
    .map((action) => {
      const group = action.payload;
      const state = store.getState();
      const auth = state.auth;
      // const user = state.users.list.find((u) => u.key === auth.uid);
      const toggleOn = !group.userIds || !group.userIds[auth.uid];
      var updates = {};
      updates[`groups/${group.key}/userIds/${auth.uid}`] = toggleOn;
      updates[`users/${auth.uid}/groupIds/${group.key}`] = toggleOn;
      return firebaseDb.ref(`orgs/${auth.user.orgId}`).update(updates);
    })
    .filter(() => false);
};

export const updateGroupEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.UPDATE_GROUP)
    .map((action) => {
      return Observable.fromPromise(groupList.update(action.payload.key, action.payload));
    })
    .flatMap(x => x);
};

export const removeGroupEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.REMOVE_GROUP)
    .map((action) => {
      return Observable.fromPromise(groupList.remove(action.payload)
        .then(() => groupActions.removeGroupSuccess(action.payload)));
    })
    .flatMap(x => x);
};

export const groupEpics = [
  signInSuccessEpic,
  createGroupEpic,
  updateGroupEpic,
  removeGroupEpic,
  toggleGroupMembershipEpic
];
