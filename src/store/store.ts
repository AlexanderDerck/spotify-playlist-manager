import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { initialRootState } from './root-state';
import { rootEpic } from './root-epic';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  preloadedState: initialRootState,
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware],
});

epicMiddleware.run(rootEpic as any);
