import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { authReducer } from "./auth";
import { orgReducer } from "./org";

export default combineReducers({
	auth: authReducer,
	routing: routerReducer,
	org: orgReducer
});
