import { combineEpics } from 'redux-observable';

import { authEpics } from './auth';
import { groupEpics } from './groups';


const epics = combineEpics(
  ...authEpics,
  ...groupEpics
);

export default epics;
