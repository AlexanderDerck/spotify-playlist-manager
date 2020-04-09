import { StringMap } from './string-map';

export function toStringMap<T>(items: T[], idSelector: (key: T) => string): StringMap<T> {
  return items.reduce((stringMap, item) => ({ ...stringMap, [idSelector(item)]: item }), {});
}
