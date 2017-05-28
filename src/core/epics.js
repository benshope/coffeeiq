import { combineEpics } from 'redux-observable';

import { authEpics } from './auth';
import { groupEpics } from './groups';
import { userEpics } from './users';

const epics = combineEpics(
  ...authEpics,
  ...groupEpics,
  ...userEpics,
);

export default epics;
