import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivalModel } from '../models/festival.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly baseUrl = 'http://eacodingtest.digital.energyaustralia.com.au' as const;

  constructor(private httpClient: HttpClient) {}

  getFestivals(): Observable<FestivalModel[]> {
    return this.httpClient.get<FestivalModel[]>(
      `${this.baseUrl}/api/v1/festivals`
    );
  }
}
