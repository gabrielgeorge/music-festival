import { createAction, props } from '@ngrx/store';
import { FestivalResponseModel } from '../../models/festival-response.model';
export const getFestivals = createAction('[App] Get festivals');

export const getFestivalsSuccess = createAction(
  '[App] Get festivals success',
  props<{ response: FestivalResponseModel[] }>()
);

export const getFestivalsFailure = createAction('[App] Get festivals failure');
