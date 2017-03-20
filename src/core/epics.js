import { combineEpics } from 'redux-observable';

import { authEpics } from './auth';
import { taskEpics } from './tasks';

const epics = combineEpics(
  ...authEpics,
  ...taskEpics
);

export default epics;
