import { AppLocalStorage } from '../models';

export function getFromLocalStorage<T extends keyof AppLocalStorage>(key: T): AppLocalStorage[T] {
  const json = localStorage.getItem(key);

  if (!json) {
    return null;
  }

  return JSON.parse(json);
}
