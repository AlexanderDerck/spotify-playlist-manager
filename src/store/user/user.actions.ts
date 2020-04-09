import { createAction } from '@reduxjs/toolkit';
import { User } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const authorize = createAction('[User] Authorize');
export const checkAuthorization = createAction('[User] Check authorization');
export const checkAuthorizationAuthorized = createAction('[User] Check authorization, authorized', props<{ accessToken: string }>());
export const checkAuthorizationNotAuthorized = createAction('[User] Check authorization, not authorized');
export const loadUserBecauseAuthorized = createAction('[User] Load user because authorized ');
export const loadUserBecauseAuthorizedSuccess = createAction('[User] Load user because authorized, success', props<{ user: User }>());
export const loadUserBecauseAuthorizedError = createErrorAction('[User] Load user because authorized, error');

const actionCreatorMap = {
  authorize,
  checkAuthorization,
  checkAuthorizationUserLoggedIn: checkAuthorizationAuthorized,
  checkAuthorizationUserNotLoggedIn: checkAuthorizationNotAuthorized,
  loadUserBecauseAuthorized,
  loadUserBecauseAuthorizedSuccess,
  loadUserBecauseAuthorizedError,
};
const all = actionTypes(actionCreatorMap);
export type UserAction = typeof all;
