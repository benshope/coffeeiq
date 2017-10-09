import { notificationActionTypes } from "./actions";

const newState = [];

const stateFunctions = {
	[notificationActionTypes.CREATE_NOTIFICATION]: (state, payload) => [...state, notification],
	[notificationActionTypes.DELETE_NOTIFICATION]: (state, payload) =>
		state.filter(notification => notification !== payload)
};

export const notificationReducer = (state = [...newState], { payload, type }) =>
	(stateFunctions[type] || (state => state))(state, payload);

export default notificationReducer;
