import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IFeature2DataItem } from './feature2.model';

@Injectable()
export class Feature2Service {
  readonly feature2ApiUri = '/feature2api/feature2data';
  constructor(private http: HttpClient) {}

  getFeature2Data(): Observable<Array<IFeature2DataItem>> {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<IFeature2DataItem>>(this.feature2ApiUri, {headers: httpHeaders});
  }
}
