import { combineEpics } from 'redux-observable';

import {
  signInEpic,
  signOutEpic
} from './auth/epics';

const rootEpic = combineEpics(
  signInEpic,
  signOutEpic
);

export default rootEpic;
