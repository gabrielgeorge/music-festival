import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MusicRecordBandVisualizerModel,
  MusicRecordVisualizerViewModel,
} from 'src/app/components/music-record-visualizer/music-record-visualizer.model';
import { musicRecordVisualizerMapper } from 'src/app/helper/data.mapper';
import { Bands, Festivals, Records } from 'src/app/models/record.model';
import { AppState } from '../reducers/app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsLoadingFestival = createSelector(
  selectAppState,
  (state) => state.isLoadingFestival
);

export const selectRecordsInTreeForm = createSelector(
  selectAppState,
  (state): MusicRecordVisualizerViewModel[] => {
    if (state) {
      const { festivals = {}, bands = {}, records = {} } = state;
      let data = musicRecordVisualizerMapper(festivals, bands, records);
      return data;
    }
    return [];
  }
);
