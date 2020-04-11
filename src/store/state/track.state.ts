import { Track } from '../../models';
import { StringMap } from '../utils';

export interface TrackState {
  tracks: StringMap<Track>;
}

export const initialTrackState: TrackState = {
  tracks: {},
};
