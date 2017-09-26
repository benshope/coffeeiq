import { updateWith } from "lodash";
import { orgActionTypes } from "./actions";
import { authActions } from "../auth/actions";

const newState = {};

const stateFunctions = {
  [orgActionTypes.ORG_VALUE]: (state, payload) => payload,
  [orgActionTypes.ORG_CHILD_ADDED]: (state, payload) => updateWith(state, payload.path, payload.value),
  [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const orgReducer = (state = { ...newState }, { payload, type }) =>
  (stateFunctions[type] || (state => state))(state, payload);

export default orgReducer;
