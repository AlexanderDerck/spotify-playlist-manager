import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-state';

export const getTaskState = (state: RootState) => state.task;

export const getRunningLoadTrackTasks = createSelector(
  getTaskState,
  (state) => state.runningLoadTrackTasks
);

export const getQueuedLoadTrackTasks = createSelector(
  getTaskState,
  (state) => state.queuedLoadTrackTasks
);

export const getCompletedLoadTrackTasks = createSelector(
  getTaskState,
  (state) => state.completedLoadTrackTasks
);
