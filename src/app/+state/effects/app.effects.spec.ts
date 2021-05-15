import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
  const dataServiceStub = jasmine.createSpyObj('DataService', ['getFestivals']);

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
});
