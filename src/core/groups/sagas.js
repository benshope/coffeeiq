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

const createGroup = write.bind(null, groupList, groupList.push, groupActions.createGroupFailed);
const removeGroup = write.bind(null, groupList, groupList.remove, groupActions.removeGroupFailed);
const updateGroup = write.bind(null, groupList, groupList.update, groupActions.updateGroupFailed);


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

function* watchCreateGroup() {
  while (true) {
    let { payload } = yield take(groupActions.CREATE_GROUP);
    yield fork(createGroup, payload.group);
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === '/') {
      yield put(groupActions.filterGroups(payload.query.filter));
    }
  }
}

function* watchRemoveGroup() {
  while (true) {
    let { payload } = yield take(groupActions.REMOVE_GROUP);
    yield fork(removeGroup, payload.group.key);
  }
}

function* watchUpdateGroup() {
  while (true) {
    let { payload } = yield take(groupActions.UPDATE_GROUP);
    yield fork(updateGroup, payload.group.key, payload.changes);
  }
}


//=====================================
//  GROUP SAGAS
//-------------------------------------

export const groupSagas = [
  fork(watchAuthentication),
  fork(watchCreateGroup),
  fork(watchLocationChange),
  fork(watchRemoveGroup),
  fork(watchUpdateGroup)
];
