import { notificationsActionTypes, notificationTypes } from "./actions";

const newState = [
    { id: "merp", message: "derp", type: notificationTypes.SUCCESS },
    { id: "merppp", message: "derppppp", type: notificationTypes.SUCCESS },
    {
        id: "merpppid",
        message:
            "YEEEeeeeeeeeeeeeeeeEEdf sfdfd sf sfsdfsfsdf sf ds fs df fsdEEEEEEeeeeeeelk elkjelkj elkejlekjelkjelkjelkejlkejelkje",
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
