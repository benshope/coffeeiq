import { combineEpics } from "redux-observable";

import { authEpics } from "./auth";
import { notificationsEpics } from "./notifications";
import { orgEpics } from "./org";

const epics = combineEpics(...authEpics, ...notificationsEpics, ...orgEpics);

export default epics;
