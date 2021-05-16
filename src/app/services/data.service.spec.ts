import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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

  it('should return correct data to the observable', () => {
    // Arrange
    const dummyData = [
      {
        name: 'Twisted Tour',
        bands: [
          {
            name: 'Auditones',
            recordLabel: 'Marner Sis. Recording',
          },
          {
            name: 'Summon',
            recordLabel: 'Outerscope',
          },
          {
            name: 'Squint-281',
          },
        ],
      },
      {
        bands: [
          {
            name: 'Critter Girls',
            recordLabel: 'ACR',
          },
          {
            name: 'Propeller',
            recordLabel: 'Pacific Records',
          },
        ],
      },
    ];
    // Act
    sut.getFestivals().subscribe((fest) => {
      expect(fest[0].name).toEqual('Twisted Tour');
      expect(fest[0].bands.length).toEqual(3);

      expect(fest[1].name).toBe('');
      expect(fest[1].bands[0].name).toEqual('Critter Girls');
    });

    // Assert
    const req = httpMock.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle empty data return correctly', () => {
    // Arrange
    const dummyData: any[] = [];

    // Act
    sut.getFestivals().subscribe((fest) => {
      expect(fest.length).toEqual(0);
    });

    // Assert
    const req = httpMock.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle null data gracefully', () => {
    // Arrange
    const dummyData = null;

    // Act
    sut.getFestivals().subscribe((fest) => {
      expect(fest.length).toEqual(0);
    });

    // Assert
    const req = httpMock.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
