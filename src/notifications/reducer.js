import { notificationsActionTypes } from "./actions";

const notificationTypes = {
	SUCCESS: "SUCCESS",
	ERROR: "ERROR"
};

const newState = [
	{ id: "merp", message: "derp", type: notificationTypes.SUCCESS },
	{ id: "merppp", message: "derppppp", type: notificationTypes.SUCCESS },
	{
		id: "merpppid",
		message: "YEEEeeeeeeeeeeeeeeeEEEEEEEEeeeeeeelk elkjelkj elkejlekjelkjelkjelkejlkejelkje",
		type: notificationTypes.ERROR
	}
];

const stateFunctions = {
	[notificationsActionTypes.CREATE_NOTIFICATION]: (state, payload) => [...state, payload],
	[notificationsActionTypes.DELETE_NOTIFICATION]: (state, payload) =>
		state.filter(notification => notification !== payload)
};

export const notificationsReducer = (state = [...newState], { payload, type }) =>
	(stateFunctions[type] || (state => state))(state, payload);

export default notificationsReducer;
