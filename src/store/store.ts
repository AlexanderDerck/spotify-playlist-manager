import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';
import { Action, configureStore, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit';
import { environment } from '../environment';
import {
    loadAllTracksForPlaylistCompleted, queueLoadTracksForPlaylistTask,
    reduceBatchOfLoadedTracksForPlaylists, retrieveTracksFromCacheSuccess, RootAction,
    runLoadTracksForPlaylistTask, runLoadTracksForPlaylistTaskCompleted,
    runLoadTracksForPlaylistTaskErrored
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
    actionSanitizer: actionSanitizer as any,
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

function actionSanitizer(action: RootAction & PayloadAction<any>): PayloadAction<any> {
  // The full 'tracks' info takes a lot of space in the devtools store, so just show length
  if (action.type === runLoadTracksForPlaylistTaskCompleted.type) {
    return {
      type: runLoadTracksForPlaylistTaskCompleted.type,
      payload: {
        playlistId: action.payload.playlistId,
        page: action.payload.page,
        tracksLength: action.payload.tracks.length,
      },
    };
  }

  if (action.type === loadAllTracksForPlaylistCompleted.type) {
    return {
      type: loadAllTracksForPlaylistCompleted.type,
      payload: {
        playlistId: action.payload.playlistId,
        tracksLength: action.payload.tracks.length,
      },
    };
  }

  if (action.type === retrieveTracksFromCacheSuccess.type) {
    return {
      type: retrieveTracksFromCacheSuccess.type,
      payload: {
        elapsed: action.payload.elapsed,
        tracksLength: Object.keys(action.payload.tracks).length,
      },
    };
  }

  if (action.type === reduceBatchOfLoadedTracksForPlaylists.type) {
    return {
      type: reduceBatchOfLoadedTracksForPlaylists.type,
      payload: {
        tracksLength: Object.keys(action.payload.tracksByPlaylistId).length,
      },
    };
  }

  return action;
}
