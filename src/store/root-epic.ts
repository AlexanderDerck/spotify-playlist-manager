import { combineEpics } from 'redux-observable';
import { userEpics } from './user/user.epics';

export const rootEpic = combineEpics(...userEpics);
