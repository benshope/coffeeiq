import { update } from "lodash";
import { orgActionTypes } from "./actions";
import { authActions } from "../auth/actions";

const newState = {};

const stateFunctions = {
  [orgActionTypes.ON_ORG_VALUE]: (state, payload) => ({
    ...update(state, payload.path, () => payload.value)
  }),
  [orgActionTypes.ON_ORG_CHILD_ADDED]: (state, payload) => ({
    ...update(state, payload.path, () => payload.value)
  }),
  [orgActionTypes.ON_ORG_CHILD_CHANGED]: (state, payload) => ({
    ...update(state, payload.path, () => payload.value)
  }),
  [orgActionTypes.ON_ORG_CHILD_REMOVED]: (state, payload) => ({
    ...update(state, payload.path, () => undefined)
  }),
  [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const orgReducer = (state = { ...newState }, { payload, type }) =>
  (stateFunctions[type] || (state => state))(state, payload);

export default orgReducer;
