export interface BandRecordFestivalFlattenedModel {
  bandName: string;
  recordLabel?: string;
  festivalName?: string;
}

export interface BandRecordFestivalDictionaryModel {
  [recordLabel: string]: {
    [bandName: string]: BandRecordFestivalFlattenedModel[];
  };
}
