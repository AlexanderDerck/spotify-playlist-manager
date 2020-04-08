import { createAction } from '@reduxjs/toolkit';
import { props } from './props';

export function createErrorAction<T extends string>(type: T) {
  return createAction(type, props<{ error }>());
}
