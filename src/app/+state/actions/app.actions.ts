import { createAction, props } from '@ngrx/store';
import { FestivalModel } from 'src/app/models/festival.model';

export const getFestivals = createAction('[App] Get festivals');

export const getFestivalsSuccess = createAction(
  '[App] Get festivals success',
  props<{ response: FestivalModel[] }>()
);

export const getFestivalsFailure = createAction('[App] Get festivals failure');
