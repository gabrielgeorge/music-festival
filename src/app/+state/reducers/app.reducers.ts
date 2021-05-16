import { Action, createReducer, on } from '@ngrx/store';
import { FestivalResponseModel } from '../../models/festival-response.model';
import * as appActions from '../actions/app.actions';

export interface AppState {
  festivals: FestivalResponseModel[];
  isLoadingFestival: boolean;
}

export const initialState: AppState = {
  festivals: [],
  isLoadingFestival: false,
};

const appReducer = createReducer(
  initialState,
  on(appActions.getFestivals, (state) => ({
    ...state,
    isLoadingFestival: true,
  })),
  on(appActions.getFestivalsSuccess, (state, action) => ({
    ...state,
    festivals: action.response,
    isLoadingFestival: false,
  })),
  on(appActions.getFestivalsFailure, (state) => ({
    ...state,
    isLoadingFestival: false,
  }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
