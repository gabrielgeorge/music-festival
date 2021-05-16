import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data.service';
import * as appActions from '../actions/app.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  getFestivals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.getFestivals),
      switchMap(() =>
        this.dataService.getFestivals().pipe(
          map((response) => {
            return appActions.getFestivalsSuccess({
              response,
            });
          }),
          catchError(() => of(appActions.getFestivalsFailure()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private dataService: DataService) {}
}
