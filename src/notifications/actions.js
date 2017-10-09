const action = type => payload => ({ type, payload });

export const notificationActionTypes = {
  REQUEST_CREATE_NOTIFICATION: "REQUEST_CREATE_NOTIFICATION",
  CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
  DELETE_NOTIFICATION: "DELETE_NOTIFICATION"
};

export const notificationActions = {
  ...notificationActionTypes,
  requestCreateNotification: action(notificationActionTypes.REQUEST_CREATE_NOTIFICATION),
  createNotification: action(notificationActionTypes.CREATE_NOTIFICATION),
  deleteNotification: action(notificationActionTypes.DELETE_NOTIFICATION)
};

export default orgActions;
