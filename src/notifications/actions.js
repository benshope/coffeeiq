const action = type => payload => ({ type, payload });

export const notificationTypes = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
};

export const notificationsActionTypes = {
    REQUEST_CREATE_ERROR_NOTIFICATION: "REQUEST_CREATE_ERROR_NOTIFICATION",
    REQUEST_CREATE_SUCCESS_NOTIFICATION: "REQUEST_CREATE_SUCCESS_NOTIFICATION",
    CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
    DELETE_NOTIFICATION: "DELETE_NOTIFICATION"
};

export const notificationsActions = {
    ...notificationsActionTypes,
    requestCreateErrorNotification: action(notificationsActionTypes.REQUEST_CREATE_ERROR_NOTIFICATION),
    requestCreateSuccessNotification: action(notificationsActionTypes.REQUEST_CREATE_SUCCESS_NOTIFICATION),
    createNotification: action(notificationsActionTypes.CREATE_NOTIFICATION),
    deleteNotification: action(notificationsActionTypes.DELETE_NOTIFICATION)
};

export default notificationsActions;
