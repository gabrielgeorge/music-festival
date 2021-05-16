export interface FestivalResponseModel {
  name?: string;
  bands: BandRecordResponseModel[];
}

export interface BandRecordResponseModel {
  name: string;
  recordLabel?: string;
}
