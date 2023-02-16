import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { StartScreenComponentComponent } from './start-screen-component/start-screen-component.component';

const routes: Routes = [
  { path: '', component: StartScreenComponentComponent },
  { path:'brands', component: BrandsComponent},
  { path:'productView', component: ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
