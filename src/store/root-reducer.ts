import { combineReducers } from '@reduxjs/toolkit';
import { playlistReducer } from './reducers/playlist.reducer';
import { userReducer } from './reducers/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  playlist: playlistReducer,
});
