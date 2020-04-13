import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';
import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { environment } from '../environment';
import {
    queueLoadTracksForPlaylistTask, runLoadTracksForPlaylistTask,
    runLoadTracksForPlaylistTaskCompleted, runLoadTracksForPlaylistTaskErrored
} from './actions';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { initialRootState } from './root-state';

const epicMiddleware = createEpicMiddleware();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: initialRootState,
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false, thunk: false }),
    epicMiddleware,
    sagaMiddleware,
  ],
  devTools: {
    predicate: actionsDevtoolsFilter,
  },
});

epicMiddleware.run(rootEpic as any);
sagaMiddleware.run(rootSaga);

function actionsDevtoolsFilter(_, action: Action): boolean {
  if (environment.EnableTracing) {
    return true;
  }

  switch (action.type) {
    case queueLoadTracksForPlaylistTask.type:
    case runLoadTracksForPlaylistTask.type:
    case runLoadTracksForPlaylistTaskCompleted.type:
    case runLoadTracksForPlaylistTaskErrored.type:
      return false;
    default:
      return true;
  }
}
