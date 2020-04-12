import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { initialRootState } from './root-state';

const epicMiddleware = createEpicMiddleware();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: initialRootState,
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware, sagaMiddleware],
  devTools: {
    // actionsBlacklist: 'LoadPlaylistTracksSaga',
  },
});

epicMiddleware.run(rootEpic as any);
sagaMiddleware.run(rootSaga);
