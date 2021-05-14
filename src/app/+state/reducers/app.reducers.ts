import { Action, createReducer, on } from '@ngrx/store';
import { FestivalModel } from 'src/app/models/festival.model';
import * as appActions from '../actions/app.actions';

export interface AppState {
  festivals: FestivalModel[];
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
  on(appActions.getFestivalsSuccess, (state, action) => {
    // action.response

    return {
      ...state,
      isLoadingFestival: false,
    };
  }),
  on(appActions.getFestivalsFailure, (state) => ({
    ...state,
    isLoadingFestival: false,
  }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
