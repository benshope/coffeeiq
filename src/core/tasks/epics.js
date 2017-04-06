/* eslint-disable no-constant-condition */
import { go } from 'react-router-redux';
import { Observable } from 'rxjs';

import { authActions } from 'core/auth';
import { taskActions } from './actions';
import { taskList } from './task-list';

export const signInSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map((payload) => {
      console.log(
        'SIGN_IN_SUCCESS epic called',
        payload,
        taskList
      );
      taskList.path = `tasks/${payload.payload.authUser.uid}`;
      // console.log('after taskList.path');
      return taskList.actionStream();
    }).flatMap((firebaseAction) => {
      console.log('firebaseAction', firebaseAction);
      return firebaseAction;
    });
};

export const signOutSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_OUT_SUCCESS)
    .map(() => {
      console.log('tasks/epics SIGN_OUT_SUCCESS epic called');
      return go('/sign-in');
    });
};

export const createTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.CREATE_TASK)
    .map((action) => {
      return Observable.fromPromise(taskList.push(action.payload));
    })
    .flatMap(x => x);
};

export const updateTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.UPDATE_TASK)
    .map((action) => {
      return Observable.fromPromise(taskList.update(action.payload.key, action.payload));
    })
    .flatMap(x => x);
};

export const removeTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.REMOVE_TASK)
    .map((action) => {
      console.log('REMOVE: ', action);
      return Observable.fromPromise(taskList.remove(action.payload)
        .then(() => taskActions.removeTaskSuccess(action.payload)));
    })
    .flatMap(x => x);
};

export const taskEpics = [
  signInSuccessEpic,
  signOutSuccessEpic,
  createTaskEpic,
  updateTaskEpic,
  removeTaskEpic
];
