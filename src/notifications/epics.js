import { Observable } from "rxjs";
import { notificationsActions, notificationTypes } from "./actions";

const DEFAULT_NOTIFICATION_DURATION = 3000;

export const requestCreateNotificationEpic = (action$, store) =>
  action$.filter(action => action.type === notificationsActions.REQUEST_CREATE_NOTIFICATION).map(({ payload }) =>
    notificationsActions.createNotification({
      id: Math.random()
        .toString(36)
        .substring(7),
      type: notificationTypes.SUCCESS,
      duration: DEFAULT_NOTIFICATION_DURATION, // will be overwritten by a duration passed in the payload
      ...payload
    })
  );

export const createNotificationEpic = (action$, store) =>
  action$
    .filter(action => action.type === notificationsActions.CREATE_NOTIFICATION)
    .flatMap(action => Observable.of(action).delay(action.payload.duration))
    .map(action => notificationsActions.deleteNotification(action.payload.id));

export const notificationsEpics = [requestCreateNotificationEpic, createNotificationEpic];
