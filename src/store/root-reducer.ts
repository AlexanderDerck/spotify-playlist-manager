import { combineReducers } from '@reduxjs/toolkit';
import { playlistReducer } from './reducers/playlist.reducer';
import { trackReducer } from './reducers/track.reducer';
import { userReducer } from './reducers/user.reducer';

export const rootReducer = combineReducers({
  playlist: playlistReducer,
  track: trackReducer,
  user: userReducer,
});
