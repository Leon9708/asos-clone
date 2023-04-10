import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { DetailViewComponent } from './detail-view.component';
import { SharedModule } from '../shared/shared-module.module';


@NgModule({
  declarations: [
    DetailViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailViewRoutingModule,
  ]
})
export class DetailViewModule { }
