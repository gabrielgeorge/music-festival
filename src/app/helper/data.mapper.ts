import { MusicRecordBandVisualizerModel, MusicRecordVisualizerViewModel } from '../components/music-record-visualizer/music-record-visualizer.model';
import { FestivalResponseModel } from '../models/festival-response.model';
import { Festivals, Bands, Records } from '../models/record.model';

export function festivalsResponseToEntitiesMapper(
  festivalResponse: FestivalResponseModel[]
): { festivals: Festivals; bands: Bands; records: Records } {
  let festivals: Festivals = {};
  let bands: Bands = {};
  let records: Records = {};

  if (festivalResponse) {
    festivalResponse.forEach((festival) => {
      festivals[festival.name] = {
        ...festivals[festival.name],
        festivalName: festival.name,
        bands: festivals[festival.name]?.bands
          ? { ...festivals[festival.name].bands }
          : {},
      };

      if (festival.bands) {
        festival.bands.forEach((band) => {
          bands[band.name] = {
            ...bands[band.name],
            bandName: band.name,
          };

          festivals[festival.name].bands[band.name] = bands[band.name];

          records[band.recordLabel] = {
            ...records[band.recordLabel],
            recordName: band.recordLabel,
            bands: records[band.recordLabel]?.bands
              ? { ...records[band.recordLabel].bands }
              : {},
          };

          records[band.recordLabel].bands[band.name] = bands[band.name];
        });
      }
    });
  }

  return { festivals, bands, records };
}

export function musicRecordVisualizerMapper(
  festivals: Festivals,
  bands: Bands,
  records: Records
): MusicRecordVisualizerViewModel[] {
  let festivalList = Object.keys(festivals)
    .sort()
    .map((festKey) => festivals[festKey]);

  let data = Object.keys(records)
    .sort()
    .reduce((acc, curr) => {
      let currentRecord = records[curr];
      let record: MusicRecordVisualizerViewModel = {
        recordName:
          currentRecord.recordName??
             '[NO RECORD LABEL]',

        bands: Object.keys(currentRecord.bands)
          .sort()
          .reduce((a, c) => {
            let currentBand = bands[c];
            let joinedFestivals = festivalList
              .filter((f) => !!f.bands[c])
              .map((f) => f.festivalName)
              .filter((festName) => !!festName)
              .sort();

            if (currentBand) {
              let band: MusicRecordBandVisualizerModel = {
                bandName: currentBand.bandName,
                festivalsAttended: joinedFestivals ?? [],
              };

              a.push(band);
            }

            return a;
          }, [] as MusicRecordBandVisualizerModel[]),
      };
      acc.push(record);
      return acc;
    }, [] as MusicRecordVisualizerViewModel[]);

  return data;
}
