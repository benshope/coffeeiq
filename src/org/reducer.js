import { orgActions } from "./actions";
import { authActions } from "../auth/actions";

const newState = {};

const stateFunctions = {
  [orgActions.ORG_VALUE]: (state, payload) => payload,
  [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const orgReducer = (state = { ...newState }, { payload, type }) =>
  (stateFunctions[type] || (state => state))(state, payload);

export default orgReducer;
