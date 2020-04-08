import { createAction } from '@reduxjs/toolkit';
import { actionTypes, props } from '../../utils';

export const authorize = createAction('[User] Authorize');
export const checkAuthorization = createAction('[User] Check authorization');
export const checkAuthorizationUserLoggedIn = createAction('[User] Check authorization, user logged in', props<{ accessToken: string }>());
export const checkAuthorizationUserNotLoggedIn = createAction('[User] Check authorization, user not logged in');

const actionCreatorMap = {
  authorize,
  checkAuthorization,
  checkAuthorizationUserLoggedIn,
  checkAuthorizationUserNotLoggedIn,
};
const all = actionTypes(actionCreatorMap);
export type UserAction = typeof all;
