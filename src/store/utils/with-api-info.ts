import { combineLatest, Observable, OperatorFunction } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ApiInfo } from '../../models';
import { RootState } from '../root-state';
import { getBearerToken, getUserId } from '../user';

export function withApiInfo<T>(store$: Observable<RootState>): OperatorFunction<T, [T, ApiInfo]> {
  return (input$: Observable<T>) =>
    input$.pipe(
      switchMap((action) =>
        combineLatest(store$.pipe(map(getBearerToken)), store$.pipe(map(getUserId))).pipe(
          filter(([bearerToken, userId]) => bearerToken !== null && userId !== null),
          map<[string, string], [T, ApiInfo]>(([bearerToken, userId]) => [
            action,
            { bearerToken, userId },
          ]),
          take(1)
        )
      )
    );
}
