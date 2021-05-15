import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { AppState } from '../reducers/app.reducers';

export interface MusicRecordVisualizerViewModel {
  recordName: string;
  bands: MusicRecordBandVisualizerModel[];
}

export interface MusicRecordBandVisualizerModel {
  bandName: string;
  festivalsAttended: string[];
}

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectRecordsInTreeForm = createSelector(
  selectAppState,
  (state): MusicRecordVisualizerViewModel[] => {
    if (state) {
      const { festivals, bands, records } = state;
      let festivalList = Object.keys(festivals).sort().map(
        (festKey) => festivals[festKey]
      );
      let data = Object.keys(records)
        .sort()
        .reduce((acc, curr) => {
          let currentRecord = records[curr];
          let record: MusicRecordVisualizerViewModel = {
            recordName: currentRecord.recordName,
            bands: Object.keys(currentRecord.bands)
              .sort()
              .reduce((a, c) => {
                let currentBand = bands[c];
                let joinedFestivals = festivalList
                  .filter((f) => f.bands[c])
                  .map((f) => f.festivalName)
                  .sort();
                let band: MusicRecordBandVisualizerModel = {
                  bandName: currentBand.bandName,
                  festivalsAttended: joinedFestivals ?? [],
                };

                a.push(band);

                return a;
              }, [] as MusicRecordBandVisualizerModel[]),
          };
          acc.push(record);
          return acc;
        }, [] as MusicRecordVisualizerViewModel[]);

      return data;
    }
    return [];
  }
);
