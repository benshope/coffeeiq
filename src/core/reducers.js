import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { groupsReducer } from './groups';


export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  groups: groupsReducer
});
