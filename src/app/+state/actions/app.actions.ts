import { createAction, props } from '@ngrx/store';
import { Bands, Festivals, Records } from 'src/app/models/record.model';

export const getFestivals = createAction('[App] Get festivals');

export const getFestivalsSuccess = createAction(
  '[App] Get festivals success',
  props<{ festivals: Festivals, bands: Bands, records: Records }>()
);

export const getFestivalsFailure = createAction('[App] Get festivals failure');
