import { combineEpics } from 'redux-observable';
import * as userEpics from './user/user.epics';

export const rootEpic = combineEpics(...Object.values(userEpics));
