import * as React from 'react';
import { Playlist } from '../../models';
import { PlaylistTag } from '../PlaylistTag/PlaylistTag';
import styles from './PlaylistTags.module.scss';

export interface PlaylistTagsProps {
  playlists: Playlist[];
}

export const PlaylistTags: React.FunctionComponent<PlaylistTagsProps> = ({ playlists }) => {
  const tags = playlists.map((playlist) => (
    <span key={playlist.id} className={styles.tag}>
      <PlaylistTag playlist={playlist}></PlaylistTag>
    </span>
  ));

  return <div className={styles.tagsContainer}>{tags}</div>;
};
