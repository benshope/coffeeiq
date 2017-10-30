import { groupFormActions } from "./actions";
import { authActions } from "../auth/actions";
import { orgActions } from "../org/actions";

const newState = {
    key: undefined, // group key
    value: {}, // group value
    sending: false
};

const stateFunctions = {
    [groupFormActions.SET_GROUP_FORM]: (state, payload) => payload,
    [groupFormActions.UPDATE_GROUP_FORM_NAME]: (state, payload) => ({
        ...state,
        value: {
            ...state.value,
            name: payload
        }
    }),
    [groupFormActions.UPDATE_GROUP_FORM_LOCATION]: (state, payload) => ({
        ...state,
        value: {
            ...state.value,
            location: payload
        }
    }),
    [orgActions.UPDATE_GROUP]: state => ({ ...state, sending: true }),
    [orgActions.CREATE_GROUP]: state => ({ ...state, sending: true }),
    [orgActions.UPDATE_GROUP_SUCCESS]: () => ({ ...newState }),
    [orgActions.CREATE_GROUP_SUCCESS]: () => ({ ...newState }),
    [orgActions.UPDATE_GROUP_FAILURE]: () => ({ ...newState, sending: false }),
    [orgActions.CREATE_GROUP_FAILURE]: () => ({ ...newState, sending: false }),
    [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const groupFormReducer = (state = { ...newState }, { payload, type }) =>
    (stateFunctions[type] || (state => state))(state, payload);

export default groupFormReducer;
