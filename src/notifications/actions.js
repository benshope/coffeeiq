const action = type => payload => ({ type, payload });

export const notificationTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const notificationsActionTypes = {
  REQUEST_CREATE_NOTIFICATION: "REQUEST_CREATE_NOTIFICATION",
  CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
  DELETE_NOTIFICATION: "DELETE_NOTIFICATION"
};

export const notificationsActions = {
  ...notificationsActionTypes,
  requestCreateNotification: action(notificationsActionTypes.REQUEST_CREATE_NOTIFICATION),
  createNotification: action(notificationsActionTypes.CREATE_NOTIFICATION),
  deleteNotification: action(notificationsActionTypes.DELETE_NOTIFICATION)
};

export default notificationsActions;
