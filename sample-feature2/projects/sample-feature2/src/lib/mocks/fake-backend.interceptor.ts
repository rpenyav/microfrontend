import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(() => {
        if (request.url.endsWith('feature2api/feature2data')) {
          return of(new HttpResponse({status: 200, body: [
              {dataPoint1: 1, dataPoint2: 'testval1', dataPoint3: 'testval1', dataPoint4: 'testval1', dataPoint5: 'testval1'},
              {dataPoint1: 2, dataPoint2: 'testval2', dataPoint3: 'testval2', dataPoint4: 'testval2', dataPoint5: 'testval2'},
              {dataPoint1: 3, dataPoint2: 'testval3', dataPoint3: 'testval3', dataPoint4: 'testval3', dataPoint5: 'testval3'},
              {dataPoint1: 4, dataPoint2: 'testval4', dataPoint3: 'testval4', dataPoint4: 'testval4', dataPoint5: 'testval4'},
              {dataPoint1: 5, dataPoint2: 'testval5', dataPoint3: 'testval5', dataPoint4: 'testval5', dataPoint5: 'testval5'},
              {dataPoint1: 6, dataPoint2: 'testval6', dataPoint3: 'testval6', dataPoint4: 'testval6', dataPoint5: 'testval6'},
              {dataPoint1: 7, dataPoint2: 'testval7', dataPoint3: 'testval7', dataPoint4: 'testval7', dataPoint5: 'testval7'},
              {dataPoint1: 8, dataPoint2: 'testval8', dataPoint3: 'testval8', dataPoint4: 'testval8', dataPoint5: 'testval8'}
            ]}));
        }
        return next.handle(request);
      }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
