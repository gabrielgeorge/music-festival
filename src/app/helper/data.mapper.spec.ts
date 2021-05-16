import { MusicRecordVisualizerViewModel } from '../components/music-record-visualizer/music-record-visualizer.model';
import { FestivalResponseModel } from '../models/festival-response.model';
import {
  BandRecordFestivalDictionaryModel,
  BandRecordFestivalFlattenedModel,
} from '../models/record.model';
import {
  festivalResponseToFlattenedDataMapper,
  flattenedDataToDictionaryModelMapper,
  bandRecordFestivalDictionaryToViewModel,
} from './data.mapper';

describe('DataMapper', () => {
  describe('festivalResponseToFlattenedDataMapper', () => {
    it('should return empty objects despite provided data is empty', () => {
      // arrange
      const response: FestivalResponseModel[] = [];
      const expected: BandRecordFestivalFlattenedModel[] = [];

      // act
      const sut = festivalResponseToFlattenedDataMapper(response);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });

    it('should correctly map the data', () => {
      // arrange
      const response: FestivalResponseModel[] = [
        {
          name: 'Small Night In',
          bands: [
            {
              name: 'The Black Dashes',
              recordLabel: 'Fourth Woman Records',
            },
            {
              name: 'Yanke East',
              recordLabel: 'MEDIOCRE Music',
            },
            {
              name: 'My Mates',
              recordLabel: 'Pacific Records',
            },
          ],
        },
        {
          name: 'LOL-palooza',
          bands: [
            {
              name: 'Werewolf Weekday',
              recordLabel: 'XS Recordings',
            },
            {
              name: 'Winter Primates',
              recordLabel: '',
            },
            {
              name: 'Frank Jupiter',
              recordLabel: 'Pacific Records',
            },
          ],
        },
      ];

      const expected: BandRecordFestivalFlattenedModel[] = [
        {
          bandName: 'The Black Dashes',
          recordLabel: 'Fourth Woman Records',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'Yanke East',
          recordLabel: 'MEDIOCRE Music',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'My Mates',
          recordLabel: 'Pacific Records',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'Werewolf Weekday',
          recordLabel: 'XS Recordings',
          festivalName: 'LOL-palooza',
        },
        {
          bandName: 'Winter Primates',
          recordLabel: '',
          festivalName: 'LOL-palooza',
        },
        {
          bandName: 'Frank Jupiter',
          recordLabel: 'Pacific Records',
          festivalName: 'LOL-palooza',
        },
      ];
      // act
      const sut = festivalResponseToFlattenedDataMapper(response);

      // assert
      expect(sut).toEqual(expected);
    });
  });

  describe('flattenedDataToDictionaryModelMapper', () => {
    it('should fail gracefully if the input is empty object', () => {
      // arrange
      const flattenedData: BandRecordFestivalFlattenedModel[] = [];
      const expected: BandRecordFestivalDictionaryModel = {};
      // act
      let sut = flattenedDataToDictionaryModelMapper(flattenedData);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });

    it('should map array record to key-value object of BandRecordFestivalDictionaryModel', () => {
      // arrange
      const flattenedData: BandRecordFestivalFlattenedModel[] = [
        {
          bandName: 'The Black Dashes',
          recordLabel: 'Fourth Woman Records',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'Yanke East',
          recordLabel: 'MEDIOCRE Music',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'My Mates',
          recordLabel: 'Pacific Records',
          festivalName: 'Small Night In',
        },
        {
          bandName: 'Werewolf Weekday',
          recordLabel: 'XS Recordings',
          festivalName: 'LOL-palooza',
        },
        {
          bandName: 'Winter Primates',
          recordLabel: '',
          festivalName: 'LOL-palooza',
        },
        {
          bandName: 'Frank Jupiter',
          recordLabel: 'Pacific Records',
          festivalName: 'LOL-palooza',
        },
      ];

      const expected: BandRecordFestivalDictionaryModel = {
        '': {
          'Winter Primates': [
            {
              bandName: 'Winter Primates',
              recordLabel: '',
              festivalName: 'LOL-palooza',
            },
          ],
        },
        'Fourth Woman Records': {
          'The Black Dashes': [
            {
              bandName: 'The Black Dashes',
              recordLabel: 'Fourth Woman Records',
              festivalName: 'Small Night In',
            },
          ],
        },
        'MEDIOCRE Music': {
          'Yanke East': [
            {
              bandName: 'Yanke East',
              recordLabel: 'MEDIOCRE Music',
              festivalName: 'Small Night In',
            },
          ],
        },
        'Pacific Records': {
          'My Mates': [
            {
              bandName: 'My Mates',
              recordLabel: 'Pacific Records',
              festivalName: 'Small Night In',
            },
          ],
          'Frank Jupiter': [
            {
              bandName: 'Frank Jupiter',
              recordLabel: 'Pacific Records',
              festivalName: 'LOL-palooza',
            },
          ],
        },
        'XS Recordings': {
          'Werewolf Weekday': [
            {
              bandName: 'Werewolf Weekday',
              recordLabel: 'XS Recordings',
              festivalName: 'LOL-palooza',
            },
          ],
        },
      };

      // act
      let sut = flattenedDataToDictionaryModelMapper(flattenedData);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });
  });

  describe('bandRecordFestivalDictionaryToViewModel', () => {
    it('should properly map dictionary to ViewModel list', () => {
      // arrange
      const data: BandRecordFestivalDictionaryModel = {
        '': {
          'Winter Primates': [
            {
              bandName: 'Winter Primates',
              recordLabel: '',
              festivalName: 'LOL-palooza',
            },
            {
              bandName: 'Winter Primates',
              recordLabel: '',
              festivalName: 'Boombeyada',
            },
          ],
        },
        'Fourth Woman Records': {
          'The Black Dashes': [
            {
              bandName: 'The Black Dashes',
              recordLabel: 'Fourth Woman Records',
              festivalName: 'Small Night In',
            },
          ],
        },
      };
      const expected: MusicRecordVisualizerViewModel[] = [
        {
          recordName: '',
          bands: [
            {
              bandName: 'Winter Primates',
              festivalsAttended: ['Boombeyada', 'LOL-palooza'],
            },
          ],
        },
        {
          recordName: 'Fourth Woman Records',
          bands: [
            {
              bandName: 'The Black Dashes',
              festivalsAttended: ['Small Night In'],
            },
          ],
        },
      ];

      // act
      let sut = bandRecordFestivalDictionaryToViewModel(data);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });

    it('should sort all properties alphabetically case insensitive', () => {
      // arrange
      const data: BandRecordFestivalDictionaryModel = {
        'Record B': {
          'Winter Primates': [
            {
              bandName: 'Winter Primates',
              recordLabel: 'RecordB',
              festivalName: 'LOL-palooza',
            },
            {
              bandName: 'Winter Primates',
              recordLabel: 'RecordB',
              festivalName: 'Boombeyada',
            },
          ],

          'Lunatic Me': [
            {
              bandName: 'Lunatic Me',
              recordLabel: 'RecordB',
              festivalName: 'Boombeyada',
            },
          ],
        },
        'Record A': {
          'The Black Dashes': [
            {
              bandName: 'The Black Dashes',
              recordLabel: 'Record A',
              festivalName: 'Small Night In',
            },
          ],
        },
      };
      const expected: MusicRecordVisualizerViewModel[] = [
        {
          recordName: 'Record A',
          bands: [
            {
              bandName: 'The Black Dashes',
              festivalsAttended: ['Small Night In'],
            },
          ],
        },
        {
          recordName: 'Record B',
          bands: [
            {
              bandName: 'Lunatic Me',
              festivalsAttended: ['Boombeyada'],
            },
            {
              bandName: 'Winter Primates',
              festivalsAttended: ['Boombeyada', 'LOL-palooza'],
            },
          ],
        },
      ];

      // act
      let sut = bandRecordFestivalDictionaryToViewModel(data);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });
  });
});
