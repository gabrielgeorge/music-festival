import { MusicRecordVisualizerViewModel } from '../components/music-record-visualizer/music-record-visualizer.model';
import { FestivalResponseModel } from '../models/festival-response.model';
import { Bands, Festivals, Records } from '../models/record.model';
import {
  festivalsResponseToEntitiesMapper,
  musicRecordVisualizerMapper,
} from './data.mapper';

describe('DataMapper', () => {
  describe('festivalsResponseToEntitiesMapper', () => {
    it('should return empty objects despite provided data is empty', () => {
      // arrange
      const response: FestivalResponseModel[] = [];

      // act
      const { bands, festivals, records } =
        festivalsResponseToEntitiesMapper(response);

      // assert
      expect(bands).toBeDefined();
      expect(bands).toEqual({});
      expect(festivals).toBeDefined();
      expect(festivals).toEqual({});
      expect(records).toBeDefined();
      expect(records).toEqual({});
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
      // act
      const { bands, festivals, records } =
        festivalsResponseToEntitiesMapper(response);

      // assert
      expect(bands).toEqual({
        'The Black Dashes': { bandName: 'The Black Dashes' },
        'Yanke East': { bandName: 'Yanke East' },
        'My Mates': { bandName: 'My Mates' },
        'Werewolf Weekday': { bandName: 'Werewolf Weekday' },
        'Winter Primates': { bandName: 'Winter Primates' },
        'Frank Jupiter': { bandName: 'Frank Jupiter' },
      });

      expect(festivals).toEqual({
        'Small Night In': {
          festivalName: 'Small Night In',
          bands: {
            'The Black Dashes': { bandName: 'The Black Dashes' },
            'Yanke East': { bandName: 'Yanke East' },
            'My Mates': { bandName: 'My Mates' },
          },
        },
        'LOL-palooza': {
          festivalName: 'LOL-palooza',
          bands: {
            'Werewolf Weekday': { bandName: 'Werewolf Weekday' },
            'Winter Primates': { bandName: 'Winter Primates' },
            'Frank Jupiter': { bandName: 'Frank Jupiter' },
          },
        },
      });

      expect(records).toEqual({
        'Fourth Woman Records': {
          recordName: 'Fourth Woman Records',
          bands: { 'The Black Dashes': { bandName: 'The Black Dashes' } },
        },
        'MEDIOCRE Music': {
          recordName: 'MEDIOCRE Music',
          bands: { 'Yanke East': { bandName: 'Yanke East' } },
        },
        'XS Recordings': {
          recordName: 'XS Recordings',
          bands: {
            'Werewolf Weekday': { bandName: 'Werewolf Weekday' },
          },
        },
        '': {
          recordName: '',
          bands: {
            'Winter Primates': { bandName: 'Winter Primates' },
          },
        },
        'Pacific Records': {
          recordName: 'Pacific Records',
          bands: {
            'Frank Jupiter': { bandName: 'Frank Jupiter' },
            'My Mates': { bandName: 'My Mates' },
          },
        },
      });
    });

    it('should not allow duplicates and handle it gracefully', () => {
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
          ],
        },
        {
          name: 'LOL-palooza',
          bands: [
            {
              name: 'The Black Dashes',
              recordLabel: 'Fourth Woman Records',
            },
          ],
        },
        {
          name: 'LOL-palooza',
          bands: [
            {
              name: 'My Mates',
              recordLabel: 'My 80s Record',
            },
          ],
        },
      ];
      // act
      const { bands, festivals, records } =
        festivalsResponseToEntitiesMapper(response);

      // assert
      expect(bands).toEqual({
        'The Black Dashes': { bandName: 'The Black Dashes' },
        'Yanke East': { bandName: 'Yanke East' },
        'My Mates': { bandName: 'My Mates' },
      });

      expect(festivals).toEqual({
        'Small Night In': {
          festivalName: 'Small Night In',
          bands: {
            'The Black Dashes': { bandName: 'The Black Dashes' },
            'Yanke East': { bandName: 'Yanke East' },
          },
        },
        'LOL-palooza': {
          festivalName: 'LOL-palooza',
          bands: {
            'The Black Dashes': { bandName: 'The Black Dashes' },
            'My Mates': { bandName: 'My Mates' },
          },
        },
      });

      expect(records).toEqual({
        'Fourth Woman Records': {
          recordName: 'Fourth Woman Records',
          bands: { 'The Black Dashes': { bandName: 'The Black Dashes' } },
        },
        'MEDIOCRE Music': {
          recordName: 'MEDIOCRE Music',
          bands: { 'Yanke East': { bandName: 'Yanke East' } },
        },
        'My 80s Record': {
          recordName: 'My 80s Record',
          bands: {
            'My Mates': { bandName: 'My Mates' },
          },
        },
      });
    });

    it('should have the right object key sizes', () => {
      const resp: FestivalResponseModel[] = [
        {
          name: 'LOL-palooza',
          bands: [
            { name: 'Frank Jupiter', recordLabel: 'Pacific Records' },
            { name: 'Werewolf Weekday', recordLabel: 'XS Recordings' },
            { name: 'Winter Primates', recordLabel: '' },
            { name: 'Jill Black', recordLabel: 'Fourth Woman Records' },
          ],
        },
        {
          name: 'Trainerella',
          bands: [
            { name: 'Manish Ditch', recordLabel: 'ACR' },
            { name: 'Adrian Venti', recordLabel: 'Monocracy Records' },
            { name: 'YOUKRANE', recordLabel: 'Anti Records' },
            { name: 'Wild Antelope', recordLabel: 'Still Bottom Records' },
          ],
        },
        {
          name: 'Small Night In',
          bands: [
            { name: 'Wild Antelope', recordLabel: 'Marner Sis. Recording' },
            { name: 'The Black Dashes', recordLabel: 'Fourth Woman Records' },
            { name: 'Squint-281', recordLabel: 'Outerscope' },
            {
              name: 'Green Mild Cold Capsicum',
              recordLabel: 'Marner Sis. Recording',
            },
            { name: 'Yanke East', recordLabel: 'MEDIOCRE Music' },
          ],
        },
        {
          name: 'Twisted Tour',
          bands: [
            { name: 'Summon', recordLabel: 'Outerscope' },
            { name: 'Auditones', recordLabel: 'Marner Sis. Recording' },
            { name: 'Squint-281', recordLabel: '' },
          ],
        },
        {
          name: '',
          bands: [
            { name: 'Propeller', recordLabel: 'Pacific Records' },
            { name: 'Critter Girls', recordLabel: 'ACR' },
          ],
        },
      ];
      const { bands, festivals, records } =
        festivalsResponseToEntitiesMapper(resp);

      expect(Object.keys(bands).length).toBe(16);
      expect(Object.keys(festivals).length).toBe(5);
      expect(Object.keys(records).length).toBe(11);
    });
  });

  describe('musicRecordVisualizerMapper', () => {
    it('should fail gracefully if the input is empty object', () => {
      // arrange
      const festivals: Festivals = {};
      const bands: Bands = {};
      const records: Records = {};

      // act
      let sut = musicRecordVisualizerMapper(festivals, bands, records);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual([]);
    });

    it('should still provide festivals despite bands and records are empty', () => {
      // arrange
      const festivals: Festivals = {
        A: { festivalName: 'A', bands: {} },
        B: { festivalName: 'B', bands: {} },
        C: { festivalName: 'C', bands: {} },
      };
      const bands: Bands = {};
      const records: Records = {};

      // act
      const sut = musicRecordVisualizerMapper(festivals, bands, records);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual([]);
    });

    it('should map each of the object correctly', () => {
      // arrange
      const festivals: Festivals = {
        'Small Night In': {
          festivalName: 'Small Night In',
          bands: {
            'The Black Dashes': { bandName: 'The Black Dashes' },
            'Yanke East': { bandName: 'Yanke East' },
          },
        },
        'LOL-palooza': {
          festivalName: 'LOL-palooza',
          bands: {
            'The Black Dashes': { bandName: 'The Black Dashes' },
            'My Mates': { bandName: 'My Mates' },
          },
        },
      };
      const bands: Bands = {
        'The Black Dashes': { bandName: 'The Black Dashes' },
        'Yanke East': { bandName: 'Yanke East' },
        'My Mates': { bandName: 'My Mates' },
      };
      const records: Records = {
        'Fourth Woman Records': {
          recordName: 'Fourth Woman Records',
          bands: { 'The Black Dashes': { bandName: 'The Black Dashes' } },
        },
        'MEDIOCRE Music': {
          recordName: 'MEDIOCRE Music',
          bands: { 'Yanke East': { bandName: 'Yanke East' } },
        },
        'My 80s Record': {
          recordName: 'My 80s Record',
          bands: {
            'My Mates': { bandName: 'My Mates' },
          },
        },
      };

      const expected: MusicRecordVisualizerViewModel[] = [
        {
          recordName: 'Fourth Woman Records',
          bands: [
            {
              bandName: 'The Black Dashes',
              festivalsAttended: ['LOL-palooza', 'Small Night In'],
            },
          ],
        },
        {
          recordName: 'MEDIOCRE Music',
          bands: [
            { bandName: 'Yanke East', festivalsAttended: ['Small Night In'] },
          ],
        },
        {
          recordName: 'My 80s Record',
          bands: [{ bandName: 'My Mates', festivalsAttended: ['LOL-palooza'] }],
        },
      ];

      // act
      const sut = musicRecordVisualizerMapper(festivals, bands, records);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });

    it('should sort the value alphabetically', () => {
      // arrange
      const festivals: Festivals = {
        festZ: {
          festivalName: 'festZ',
          bands: {
            bandC: { bandName: 'bandC' },
            bandB: { bandName: 'bandB' },
          },
        },
        festA: {
          festivalName: 'festA',
          bands: {
            bandA: { bandName: 'bandA' },
            bandB: { bandName: 'bandB' },
          },
        },
      };
      const bands: Bands = {
        bandB: { bandName: 'bandB' },
        bandC: { bandName: 'bandC' },
        bandA: { bandName: 'bandA' },
      };
      const records: Records = {
        RB: {
          recordName: 'RB',
          bands: { bandC: { bandName: 'bandC' } },
        },
        RC: {
          recordName: 'RC',
          bands: {
            bandB: { bandName: 'bandB' },
          },
        },
        RA: {
          recordName: 'RA',
          bands: { bandA: { bandName: 'bandA' } },
        },
      };

      const expected: MusicRecordVisualizerViewModel[] = [
        {
          recordName: 'RA',
          bands: [
            {
              bandName: 'bandA',
              festivalsAttended: ['festA'],
            },
          ],
        },
        {
          recordName: 'RB',
          bands: [{ bandName: 'bandC', festivalsAttended: ['festZ'] }],
        },
        {
          recordName: 'RC',
          bands: [{ bandName: 'bandB', festivalsAttended: ['festA', 'festZ'] }],
        },
      ];

      // act
      const sut = musicRecordVisualizerMapper(festivals, bands, records);

      // assert
      expect(sut).toBeDefined();
      expect(sut).toEqual(expected);
    });
  });
});
