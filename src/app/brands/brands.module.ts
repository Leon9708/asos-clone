import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { SharedModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [
    BrandsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrandsRoutingModule,
  ]
})
export class BrandsModule { }
