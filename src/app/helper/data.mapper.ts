import {
  MusicRecordBandVisualizerModel,
  MusicRecordVisualizerViewModel,
} from '../components/music-record-visualizer/music-record-visualizer.model';
import { FestivalResponseModel } from '../models/festival-response.model';
import {
  BandRecordFestivalFlattenedModel,
  BandRecordFestivalDictionaryModel,
} from '../models/record.model';
import { groupBy } from 'lodash-es';

export function festivalResponseToFlattenedDataMapper(
  festivalResponse: FestivalResponseModel[]
): BandRecordFestivalFlattenedModel[] {
  let data = festivalResponse.reduce((festAcc, festCurr) => {
    let mapped = festCurr.bands.map(
      (band): BandRecordFestivalFlattenedModel => ({
        bandName: band.name,
        recordLabel: band.recordLabel ?? '',
        festivalName: festCurr.name,
      })
    );
    return [...festAcc, ...mapped];
  }, [] as BandRecordFestivalFlattenedModel[]);
  return data;
}

export function flattenedDataToDictionaryModelMapper(
  flattenedData: BandRecordFestivalFlattenedModel[]
): BandRecordFestivalDictionaryModel {
  let groupedByRecordLabel = groupBy(flattenedData, 'recordLabel');

  return Object.keys(groupedByRecordLabel)
    .sort()
    .reduce((acc, curr) => {
      acc[curr] = groupBy(groupedByRecordLabel[curr], 'bandName');
      return acc;
    }, {} as { [recordLabel: string]: { [bandName: string]: BandRecordFestivalFlattenedModel[] } });
}

export function bandRecordFestivalDictionaryToViewModel(
  records: BandRecordFestivalDictionaryModel
): MusicRecordVisualizerViewModel[] {
  return Object.keys(records)
    .sort((a, b) => (a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1))
    .reduce((acc, curr) => {
      let currentRecord = records[curr];
      let model: MusicRecordVisualizerViewModel = {
        recordName: curr?.length ? curr : '',
        bands: Object.keys(currentRecord)
          .sort((a, b) =>
            a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1
          )
          .reduce((bandsAcc, bandsCurr) => {
            let bandRecord: Record<string, MusicRecordBandVisualizerModel> = {};
            currentRecord[bandsCurr].forEach((b) => {
              const festivalsAttended: string[] = bandRecord[b.bandName]
                ?.festivalsAttended
                ? [...bandRecord[b.bandName].festivalsAttended]
                : [];
              if (b.festivalName) {
                festivalsAttended.push(b.festivalName);
              }

              bandRecord[b.bandName] = {
                ...bandRecord[b.bandName],
                bandName: b.bandName,
                festivalsAttended,
              };
            });

            const bands = Object.keys(bandRecord)
              .sort((a, b) =>
                a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1
              )
              .map((key) => {
                return {
                  ...bandRecord[key],
                  festivalsAttended: [...bandRecord[key].festivalsAttended]
                    .filter((x) => !!x)
                    .sort((a, b) =>
                      a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1
                    ),
                };
              });

            bandsAcc.push(...bands);
            return bandsAcc;
          }, [] as MusicRecordBandVisualizerModel[]),
      };

      acc.push(model);

      return acc;
    }, [] as MusicRecordVisualizerViewModel[]);
}
