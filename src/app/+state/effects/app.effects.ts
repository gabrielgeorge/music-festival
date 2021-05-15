import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from 'src/app/services/data.service';
import * as appActions from '../actions/app.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { festivalsResponseToEntitiesMapper } from 'src/app/helper/data.mapper';

@Injectable()
export class AppEffects {
  getFestivals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.getFestivals),
      switchMap(() =>
        this.dataService.getFestivals().pipe(
          map((response) => {
            const { bands, festivals, records } =
              festivalsResponseToEntitiesMapper(response);
            return appActions.getFestivalsSuccess({
              bands,
              records,
              festivals,
            });
          }),
          catchError(() => of(appActions.getFestivalsFailure()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private dataService: DataService) {}
}
