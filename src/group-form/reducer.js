import { groupFormActions } from "./actions";
import { authActions } from "../auth/actions";
import { orgActions } from "../org/actions";

const newState = {
    key: undefined, // group key
    value: {} // group value
};

const stateFunctions = {
    [groupFormActions.UPDATE_GROUP_FORM]: (state, payload) => ({ ...state, ...payload }),
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
    [orgActions.UPDATE_GROUP_SUCCESS]: () => ({ ...newState }),
    [authActions.SIGN_OUT_SUCCESS]: () => ({ ...newState })
};

export const groupFormReducer = (state = { ...newState }, { payload, type }) =>
    (stateFunctions[type] || (state => state))(state, payload);

export default groupFormReducer;
