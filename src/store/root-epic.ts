import { combineEpics } from 'redux-observable';
import * as playlistEpics from './epics/playlist.epics';
import * as userEpics from './epics/user.epics';

export const rootEpic = combineEpics(
  ...(Object.values(userEpics) as any),
  ...(Object.values(playlistEpics) as any)
);
