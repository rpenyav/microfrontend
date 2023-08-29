import { NgModule } from '@angular/core';
import { Feature2SubComponent } from './feature2-sub/feature2-sub.component';
import { Feature2Component } from './feature2.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeBackendInterceptor } from './mocks/fake-backend.interceptor';
import { Feature2Service } from './feature2.service';
import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [Feature2SubComponent, Feature2Component],
  imports: [
    HttpClientModule,
    CdkTableModule,
    OverlayModule
  ],
  providers: [
    Feature2Service,
    // Providing fake backend interceptor for simulating api calls. Remove this before using an actual api
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    }
  ],
  exports: [
    Feature2SubComponent
  ]
})
export class Feature2Module { }
