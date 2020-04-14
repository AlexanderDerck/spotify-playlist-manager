import { AppLocalStorage } from '../models';

export function saveInLocalStorage<T extends keyof AppLocalStorage>(
  key: T,
  value: AppLocalStorage[T]
): void {
  localStorage.setItem(key, JSON.stringify(value));
}
