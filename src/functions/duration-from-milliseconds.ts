import { Duration } from '../models';

export function durationFromMilliseconds(milliseconds: number): Duration {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
}
