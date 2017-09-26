import { combineEpics } from "redux-observable";

import { authEpics } from "./auth";
import { orgEpics } from "./org";

const epics = combineEpics(...authEpics, ...orgEpics);

export default epics;
