import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/store/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
});
