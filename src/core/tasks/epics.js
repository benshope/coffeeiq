/* eslint-disable no-constant-condition */
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
    .map(() => { console.log('SIGN_OUT_SUCCESS epic called'); });
};

export const createTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.CREATE_TASK)
    .map(() => { console.log('CREATE_TASK epic called'); });
};

export const updateTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.UPDATE_TASK)
    .map(() => { console.log('UPDATE_TASK epic called'); });
};

export const removeTaskEpic = (action$) => {
  return action$
    .filter(action => action.type === taskActions.REMOVE_TASK)
    .map(() => { console.log('REMOVE_TASK epic called'); });
};

export const taskEpics = [
  signInSuccessEpic,
  signOutSuccessEpic,
  createTaskEpic,
  updateTaskEpic,
  removeTaskEpic
];
