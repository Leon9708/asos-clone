import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreviewCartComponent } from '../preview-cart/preview-cart.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PreviewCartComponent,
    LoadingSpinnerComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    PreviewCartComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }