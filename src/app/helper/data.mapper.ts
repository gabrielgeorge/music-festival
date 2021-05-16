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
