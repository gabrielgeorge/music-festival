import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FestivalModel } from '../models/festival.model';
import { DataService } from './data.service';

describe('DataService', () => {
  let sut: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    sut = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should return Observable<FestivalModel[]>', () => {
    // Arrange
    const dummyData: FestivalModel[] = [
      {
        name: 'Twisted Tour',
        bands: [
          {
            bandName: 'Auditones',
            recordLabel: 'Marner Sis. Recording',
          },
          {
            bandName: 'Summon',
            recordLabel: 'Outerscope',
          },
          {
            bandName: 'Squint-281',
          },
        ],
      },
      {
        bands: [
          {
            bandName: 'Critter Girls',
            recordLabel: 'ACR',
          },
          {
            bandName: 'Propeller',
            recordLabel: 'Pacific Records',
          },
        ],
      },
    ];
    // Act
    sut.getFestivals().subscribe((fest) => {
      expect(fest[0].name).toEqual('Twisted Tour');
      expect(fest[0].bands.length).toEqual(3);

      expect(fest[1].name).toBeUndefined();
      expect(fest[1].bands[0].bandName).toEqual('Critter Girls');
    });

    // Assert

    const req = httpMock.expectOne(`${sut.baseUrl}/api/v1/festivals`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
