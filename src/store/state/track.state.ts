import { Track } from '../../models';
import { StringMap } from '../utils';

export interface TrackState {
  tracks: StringMap<Track>;
  searchTerm: string;
}

export const initialTrackState: TrackState = {
  tracks: {},
  searchTerm: null,
};
