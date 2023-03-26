import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreviewCartComponent } from '../preview-cart/preview-cart.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PreviewCartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    PreviewCartComponent
  ]
})
export class SharedModule { }