import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks';

export const rootEpic = combineEpics(
  // pingEpic,
  // fetchUserEpic
);

export const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer
});
