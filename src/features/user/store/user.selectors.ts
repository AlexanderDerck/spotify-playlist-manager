import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/root-state';

export const getUserState = (state: RootState) => state.user;

export const getAccessToken = createSelector(getUserState, (state) => state.accessToken);

export const getIsAuthenticated = createSelector(
  getAccessToken,
  (accessToken) => accessToken !== null
);
