import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Feature1Component } from 'projects/sample-feature1/src/lib';

const routes: Routes = [
  {
    path: 'feature1',
    component: Feature1Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
