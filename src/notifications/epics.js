import { Observable } from "rxjs";
import notificationActions from "./actions";

const DEFAULT_NOTIFICATION_DURATION = 3000;

export const createNotificationEpic = (action$, store) =>
  action$.filter(action => action.type === notificationActions.REQUEST_CREATE_NOTIFICATION).map(({ payload }) =>
    notificationActions.createNotification({
      id: uuid.v4(), // TODO: set to random
      duration: DEFAULT_NOTIFICATION_DURATION, // will be overwritten by a duration passed in the payload
      ...payload
    })
  );

export const createNotificationSuccessEpic = (action$, store) =>
  action$
    .filter(action => action.type === notificationActions.CREATE_NOTIFICATION)
    .flatMap(action => Observable.of(action).delay(action.payload.duration))
    .map(action => notificationActions.deleteNotification(action.payload.id));

export const notificationEpics = [createNotificationEpic, createNotificationSuccessEpic];
