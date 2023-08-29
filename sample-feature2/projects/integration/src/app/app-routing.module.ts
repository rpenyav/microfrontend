import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  Feature2Component,
  Feature2SubComponent,
} from 'projects/sample-feature2/src/lib';

const routes: Routes = [
  {
    path: 'feature2',
    component: Feature2Component,
  },
  {
    path: 'feature2-sub',
    component: Feature2SubComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
