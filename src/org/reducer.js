// import { updateWith } from "lodash";
import { orgActionTypes } from "./actions";
import { authActions } from "../auth/actions";

const newState = { users: {}, groups: {} };

const stateFunctions = {
    [orgActionTypes.ON_ORG_VALUE]: (state, payload) => payload,
    [orgActionTypes.ON_ORG_CHILD_ADDED]: (state, payload) => ({ ...state, [payload.path]: payload.value }),
    [orgActionTypes.ON_ORG_CHILD_CHANGED]: (state, payload) => ({ ...state, [payload.path]: payload.value }),
    [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const orgReducer = (state = { ...newState }, { payload, type }) =>
    (stateFunctions[type] || (state => state))(state, payload);

export default orgReducer;
