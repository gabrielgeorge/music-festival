import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MusicRecordVisualizerViewModel } from '../../components/music-record-visualizer/music-record-visualizer.model';
import {
  festivalResponseToFlattenedDataMapper,
  flattenedDataToDictionaryModelMapper,
  bandRecordFestivalDictionaryToViewModel,
} from '../../helper/data.mapper';
import {
  BandRecordFestivalDictionaryModel,
  BandRecordFestivalFlattenedModel,
} from '../../models/record.model';
import { AppState } from '../reducers/app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsLoadingFestival = createSelector(
  selectAppState,
  (state) => state.isLoadingFestival
);

export const selectFestivalFlattenedRecord = createSelector(
  selectAppState,
  (state): BandRecordFestivalFlattenedModel[] | undefined => {
    if (state && state.festivals) {
      return festivalResponseToFlattenedDataMapper(state.festivals);
    }
    return undefined;
  }
);

export const selectRecordBandFestivalDictionary = createSelector(
  selectFestivalFlattenedRecord,
  (state): BandRecordFestivalDictionaryModel | undefined => {
    if (state) {
      return flattenedDataToDictionaryModelMapper(state);
    }
    return undefined;
  }
);

export const selectRecordsInTreeForm = createSelector(
  selectRecordBandFestivalDictionary,
  (records): MusicRecordVisualizerViewModel[] => {
    if (records) {
      return bandRecordFestivalDictionaryToViewModel(records);
    }
    return [];
  }
);
