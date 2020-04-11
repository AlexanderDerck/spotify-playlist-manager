import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-state';

export const getUserState = (state: RootState) => state.user;

export const getAccessToken = createSelector(getUserState, (state) => state.accessToken);

export const getBearerToken = createSelector(
  getAccessToken,
  (accessToken) => `Bearer ${accessToken}`
);

export const getIsAuthenticated = createSelector(
  getAccessToken,
  (accessToken) => accessToken !== null
);

export const getUserId = createSelector(getUserState, (state) => state.user && state.user.id);
