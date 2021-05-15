import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { AppState } from '../reducers/app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectRecordsInTreeForm = createSelector(
  selectAppState,
  (state) => {
    return { f: state.festivals, b: state.bands, r: state.records };
  }
);
