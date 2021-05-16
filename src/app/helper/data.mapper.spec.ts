import { FestivalResponseModel } from '../models/festival-response.model';
import { festivalsResponseToEntitiesMapper } from './data.mapper';

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
});
