/* eslint-disable no-constant-condition */
import { LOCATION_CHANGE } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'core/auth';
import { groupActions } from './actions';
import { groupList } from './group-list';


function subscribe() {
  return eventChannel(emit => groupList.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  }
  catch (error) {
    yield put(onError(error));
  }
}

const createTask = write.bind(null, groupList, groupList.push, groupActions.createTaskFailed);
const removeTask = write.bind(null, groupList, groupList.remove, groupActions.removeTaskFailed);
const updateTask = write.bind(null, groupList, groupList.update, groupActions.updateTaskFailed);


//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_SUCCESS);

    groupList.path = `groups/${payload.authUser.uid}`;
    const job = yield fork(read);

    yield take([authActions.SIGN_OUT_SUCCESS]);
    yield cancel(job);
  }
}

function* watchCreateTask() {
  while (true) {
    let { payload } = yield take(groupActions.CREATE_TASK);
    yield fork(createTask, payload.group);
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === '/') {
      yield put(groupActions.filterTasks(payload.query.filter));
    }
  }
}

function* watchRemoveTask() {
  while (true) {
    let { payload } = yield take(groupActions.REMOVE_TASK);
    yield fork(removeTask, payload.group.key);
  }
}

function* watchUpdateTask() {
  while (true) {
    let { payload } = yield take(groupActions.UPDATE_TASK);
    yield fork(updateTask, payload.group.key, payload.changes);
  }
}


//=====================================
//  TASK SAGAS
//-------------------------------------

export const groupSagas = [
  fork(watchAuthentication),
  fork(watchCreateTask),
  fork(watchLocationChange),
  fork(watchRemoveTask),
  fork(watchUpdateTask)
];
