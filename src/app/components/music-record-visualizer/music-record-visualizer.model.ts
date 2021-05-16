export interface MusicRecordVisualizerViewModel {
  recordName: string;
  bands: MusicRecordBandVisualizerModel[];
}

export interface MusicRecordBandVisualizerModel {
  bandName: string;
  festivalsAttended: string[];
}
