import { Dictionary } from './dictionary.model';

export interface FestivalModel {
  festivalName: string;
  bands: Bands;
}

export interface RecordModel {
  recordName: string;
  bands: Bands;
}

export interface BandModel {
  bandName: string;
}

export interface Festivals extends Dictionary<FestivalModel> {}

export interface Bands extends Dictionary<BandModel> {}

export interface Records extends Dictionary<RecordModel> {}
