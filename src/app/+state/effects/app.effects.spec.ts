import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { AppEffects } from './app.effects';
import { TestScheduler } from 'rxjs/testing';
import * as appActions from '../actions/app.actions';
import { FestivalResponseModel } from '../../models/festival-response.model';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  let testScheduler: TestScheduler;

  beforeEach(() => {
    const dataServiceStub = jasmine.createSpyObj('DataService', [
      'getFestivals',
    ]);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useValue: dataServiceStub },
      ],
    });

    effects = TestBed.inject(AppEffects);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle getFestivals$ correctly', () => {
    // arrange
    const mockResponse: FestivalResponseModel[] = [];

    // act
    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a', {
        a: appActions.getFestivals(),
      });
      dataServiceSpy.getFestivals.and.returnValue(
        cold('--a|', { a: mockResponse })
      );

      // assert
      expectObservable(effects.getFestivals$).toBe('---c', {
        c: appActions.getFestivalsSuccess({ response: mockResponse }),
      });
    });
  });

  it('should handle getFestivals$ correctly', () => {
    // arrange

    // act
    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a', {
        a: appActions.getFestivals(),
      });
      dataServiceSpy.getFestivals.and.returnValue(cold('--#|', {}, 'error'));

      // assert
      expectObservable(effects.getFestivals$).toBe('---c', {
        c: appActions.getFestivalsFailure(),
      });
    });
  });
});
