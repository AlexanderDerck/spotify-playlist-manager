import { combineEpics } from 'redux-observable';
import * as playlistEpics from './epics/playlist.epics';
import * as trackEpics from './epics/track.epics';
import * as userEpics from './epics/user.epics';

export const rootEpic = combineEpics(
  ...(Object.values(playlistEpics) as any),
  ...(Object.values(trackEpics) as any),
  ...(Object.values(userEpics) as any)
);
