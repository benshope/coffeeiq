import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer
});

export default rootReducer;
