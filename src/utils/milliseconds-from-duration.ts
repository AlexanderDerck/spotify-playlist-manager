import { Duration } from '../models';

export function millisecondsFromDuration(duration: Duration): number {
  return duration.hours * 3600000 + duration.minutes * 60000 + duration.seconds * 1000;
}
