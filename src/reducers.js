import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { authReducer } from "./auth";
import { notificationsReducer } from "./notifications";
import { orgReducer } from "./org";

export default combineReducers({
    auth: authReducer,
    notifications: notificationsReducer,
    org: orgReducer,
    routing: routerReducer
});
