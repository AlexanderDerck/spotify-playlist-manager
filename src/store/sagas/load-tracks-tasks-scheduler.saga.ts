import { actionChannel, all, call, put, select, take } from 'typed-redux-saga';
import { environment } from '../../environment';
import {
    queueLoadTracksForPlaylistTask, runLoadTracksForPlaylistTask,
    runLoadTracksForPlaylistTaskCompleted, runLoadTracksForPlaylistTaskErrored
} from '../actions';
import { getQueuedLoadTrackTasks, getRunningLoadTrackTasks } from '../selectors';

export function* loadTracksTasksSchedulerSaga() {
  while (true) {
    yield all([call(queueTracksTaskFlow), call(completedTracksTaskFlow)]);
  }
}

function* queueTracksTaskFlow() {
  const requestChannel = yield actionChannel(queueLoadTracksForPlaylistTask);

  while (true) {
    yield take(requestChannel);
    const runningTasks = yield* select(getRunningLoadTrackTasks);

    if (runningTasks.length >= environment.ConcurrentRequestLimit) {
      return;
    }

    /* This flow gets triggered whenever a new action is queued. However, we always 
    run the task at the beginning of the queue. No need to check the length of the queued
    tasks, because when this code gets run, the 'queueLoadTracks' reducer has already ran
    and put the item of this action at the end of the queue. */
    const queuedTasks = yield* select(getQueuedLoadTrackTasks);
    const taskToRun = queuedTasks[0];

    yield put(runLoadTracksForPlaylistTask(taskToRun));
  }
}

function* completedTracksTaskFlow() {
  const requestChannel = yield actionChannel([runLoadTracksForPlaylistTaskCompleted, runLoadTracksForPlaylistTaskErrored]);

  while (true) {
    yield take(requestChannel);
    const queuedTasks = yield* select(getQueuedLoadTrackTasks);

    if (queuedTasks.length) {
      const taskToRun = queuedTasks[0];
      yield put(runLoadTracksForPlaylistTask(taskToRun));
    }
  }
}
