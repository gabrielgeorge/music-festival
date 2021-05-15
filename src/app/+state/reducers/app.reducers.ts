import { Action, createReducer, on } from '@ngrx/store';
import { FestivalResponseModel } from 'src/app/models/festival-response.model';
import { Bands, Festivals, Records } from 'src/app/models/record.model';
import * as appActions from '../actions/app.actions';

export interface AppState {
  festivals: Festivals;
  bands: Bands;
  records: Records;
  isLoadingFestival: boolean;
}

export const initialState: AppState = {
  festivals: {},
  bands: {},
  records: {},
  isLoadingFestival: false,
};

const appReducer = createReducer(
  initialState,
  on(appActions.getFestivals, (state) => ({
    ...state,
    isLoadingFestival: true,
  })),
  on(appActions.getFestivalsSuccess, (state, action) => {
    const festivals = { ...state.festivals, ...action.festivals };
    const records = { ...state.records, ...action.records };
    const bands = { ...state.bands, ...action.bands };

    return {
      ...state,
      bands,
      festivals,
      records,
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
