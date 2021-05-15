import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivalResponseModel } from '../models/festival-response.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getFestivals(): Observable<FestivalResponseModel[]> {
    return this.httpClient
      .get<FestivalResponseModel[]>(`/api/v1/festivals`)
      .pipe(
        map((festivals) => {
          if (!festivals || !festivals.length) {
            return [];
          }
          return festivals.map((festival) => {
            festival.name = festival.name ?? '';
            if (festival.bands && festival.bands.length) {
              festival.bands.map((band) => ({
                ...band,
                name: band.name ?? '',
                recordLabel: band.recordLabel ?? '',
              }));
            } else {
              festival.bands = [];
            }
            return festival;
          });
        })
      );
  }
}
