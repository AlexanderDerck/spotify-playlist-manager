import { combineReducers } from '@reduxjs/toolkit';
import { playlistReducer } from './playlist/playlist.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  playlist: playlistReducer,
});
