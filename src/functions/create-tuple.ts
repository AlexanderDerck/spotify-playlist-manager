/**
 * Helper function to create a tuple type with Typescript as type
 * inference still sucks for it. Typescript as it is now always
 * infers the declaration of a tuple type (without explicit typing)
 * as an array.
 */
// prettier-ignore
export function createTuple<T extends any>(t1: T): [T];
// prettier-ignore
export function createTuple<T1 extends any, T2 extends any>(t1: T1, t2: T2): [T1, T2];
// prettier-ignore
export function createTuple<T1 extends any, T2 extends any, T3 extends any>(t1: T1, t2: T2, t3: T3): [T1, T2, T3];
export function createTuple<T extends any[]>(...data: T) {
  return data;
}
