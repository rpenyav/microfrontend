import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IFeature1DataItem } from './feature1.model';

@Injectable()
export class Feature1Service {
  readonly feature1ApiUri = '/feature1api/feature1data';
  constructor(private http: HttpClient) {}

  getFeature1Data(): Observable<Array<IFeature1DataItem>> {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<IFeature1DataItem>>(this.feature1ApiUri, {headers: httpHeaders});
  }
}
