import { combineEpics } from 'redux-observable';
import { userEpics } from '../features/user/store';

export const rootEpic = combineEpics(...userEpics);
