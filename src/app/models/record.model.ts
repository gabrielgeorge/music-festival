export interface RecordModel {
  name: string;
  bands: BandFestivalModel[];
}

export interface BandFestivalModel {
  bandName: string;
  festivalName: string;
}
