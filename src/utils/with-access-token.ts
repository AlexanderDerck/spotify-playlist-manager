import { Observable, OperatorFunction } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { RootState } from '../store/root-state';
import { getAccessToken } from '../store/user';

export function withAccessToken<T>(
  store$: Observable<RootState>
): OperatorFunction<T, [T, string]> {
  return (input$: Observable<T>) =>
    input$.pipe(
      switchMap((action) =>
        store$.pipe(
          map(getAccessToken),
          filter((accessToken) => accessToken !== null),
          map<string, [T, string]>((accessToken) => [action, accessToken]),
          take(1)
        )
      )
    );
}
