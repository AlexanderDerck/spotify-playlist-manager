import { StringMap } from './string-map';

export function toStringMap<T>(map: Map<string, T>): StringMap<T>;
export function toStringMap<T>(items: T[], idSelector: (key: T) => string): StringMap<T>;
// prettier-ignore
export function toStringMap<T>(items: T[] | Map<string, T>, idSelector?: (key: T) => string): StringMap<T> {
  if(items instanceof Map) {
    return [...items.entries()].reduce((map, [key,value]) => {
      map[key] = value;
      return map;
    }, {});
  }

  return items.reduce((stringMap, item) => ({ ...stringMap, [idSelector(item)]: item }), {});
}
