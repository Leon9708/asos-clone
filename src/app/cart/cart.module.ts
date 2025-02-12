import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from '../cart/cart.component';
import { SharedModule } from '../shared/components/shared-module.module';
import { FormsModule } from '@angular/forms';
import { BoughtComponent } from './bought/bought.component';




@NgModule({
  declarations: [
    CartComponent,
    BoughtComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CartModule { }
