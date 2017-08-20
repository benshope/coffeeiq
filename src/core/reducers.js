import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { authReducer } from "./auth";
import { groupsReducer } from "./groups";
import { usersReducer } from "./users";

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  groups: groupsReducer,
  users: usersReducer
});
