import { combineReducers } from '@reduxjs/toolkit';
import { playlistReducer } from './reducers/playlist.reducer';
import { taskReducer } from './reducers/task.reducer';
import { trackReducer } from './reducers/track.reducer';
import { userReducer } from './reducers/user.reducer';

export const rootReducer = combineReducers({
  playlist: playlistReducer,
  task: taskReducer,
  track: trackReducer,
  user: userReducer,
});
