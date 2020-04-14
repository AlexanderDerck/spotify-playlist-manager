import { delay, put, select } from 'typed-redux-saga';
import { batchReduceLoadTracksForPlaylistTask } from '../actions';
import { getCompletedLoadTrackTasks } from '../selectors/task.selectors';

export function* batchReduceLoadTracksTasksSaga() {
  while (true) {
    const completedLoadTrackTasks = yield* select(getCompletedLoadTrackTasks);

    if (completedLoadTrackTasks.length > 0) {
      const tracks = completedLoadTrackTasks.flatMap((t) => t.tracks);

      yield put(batchReduceLoadTracksForPlaylistTask({ tracks }));
    }

    yield delay(1000);
  }
}
