export interface BandRecordModel {
  bandName: string;
  recordLabel?: string;
}

export interface FestivalModel {
  name?: string;
  bands: BandRecordModel[];
}
