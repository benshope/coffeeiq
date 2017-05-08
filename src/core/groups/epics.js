/* eslint-disable no-constant-condition */
import { go } from 'react-router-redux';
import { Observable } from 'rxjs';

import { authActions } from 'core/auth';
import { groupActions } from './actions';
import { groupList } from './group-list';

export const signInSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map((payload) => {
      console.log(
        'SIGN_IN_SUCCESS epic called',
        payload,
        groupList
      );
      groupList.path = `groups/${payload.payload.authUser.uid}`;
      // console.log('after groupList.path');
      return groupList.actionStream();
    }).flatMap((firebaseAction) => {
      console.log('firebaseAction', firebaseAction);
      return firebaseAction;
    });
};

export const signOutSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_OUT_SUCCESS)
    .map(() => {
      console.log('groups/epics SIGN_OUT_SUCCESS epic called');
      return go('/sign-in');
    });
};

export const createTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.CREATE_TASK)
    .map((action) => {
      return Observable.fromPromise(groupList.push(action.payload));
    })
    .flatMap(x => x);
};

export const toggleGroupMembershipEpic = (action$, store) => {
  return action$
    .filter((action) => {
      return action.type === groupActions.TOGGLE_GROUP_MEMBERSHIP;
    })
    .map((action) => {
      const uid = store.getState().auth.uid;
      const group = action.payload;
      return Observable.fromPromise(
        groupList.addMemberToGroup(group, uid));
    })
    .flatMap(x => x);
};

export const updateTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.UPDATE_TASK)
    .map((action) => {
      return Observable.fromPromise(groupList.update(action.payload.key, action.payload));
    })
    .flatMap(x => x);
};

export const removeTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === groupActions.REMOVE_TASK)
    .map((action) => {
      console.log('REMOVE: ', action);
      return Observable.fromPromise(groupList.remove(action.payload)
        .then(() => groupActions.removeTaskSuccess(action.payload)));
    })
    .flatMap(x => x);
};

export const groupEpics = [
  signInSuccessEpic,
  signOutSuccessEpic,
  createTaskEpic,
  updateTaskEpic,
  removeTaskEpic,
  toggleGroupMembershipEpic
];
