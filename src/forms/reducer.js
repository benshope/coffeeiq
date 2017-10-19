import { update } from "lodash";
import { formsActionTypes } from "./actions";
import { authActions } from "../auth/actions";

const newState = {};

const stateFunctions = {
	[formsActionTypes.ON_FORMS_VALUE]: (state, payload) => ({ ...update(state, payload.path, () => payload.value) }),
	[formsActionTypes.ON_FORMS_CHILD_ADDED]: (state, payload) => ({
		...update(state, payload.path, () => payload.value)
	}),
	[formsActionTypes.ON_FORMS_CHILD_CHANGED]: (state, payload) => ({
		...update(state, payload.path, () => payload.value)
	}),
	[authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const formsReducer = (state = { ...newState }, { payload, type }) =>
	(stateFunctions[type] || (state => state))(state, payload);

export default formsReducer;
