import { combineEpics } from 'redux-observable';
import * as playlistEpics from './playlist/playlist.epics';
import * as userEpics from './user/user.epics';

export const rootEpic = combineEpics(...Object.values(userEpics), ...Object.values(playlistEpics));
