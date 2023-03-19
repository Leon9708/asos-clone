import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { DetailViewComponent } from './detail-view.component';
import { SharedModule } from '../shared/shared-module.module';
import { ProductdetailsComponent } from './pop-up/productdetails/productdetails.component';
import { BrandComponent } from './pop-up/brand/brand.component';
import { SizeandfitComponent } from './pop-up/sizeandfit/sizeandfit.component';
import { AboutmeComponent } from './pop-up/aboutme/aboutme.component';


@NgModule({
  declarations: [
    DetailViewComponent,
    ProductdetailsComponent,
    BrandComponent,
    SizeandfitComponent,
    AboutmeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailViewRoutingModule,
  ]
})
export class DetailViewModule { }
