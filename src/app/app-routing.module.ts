import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { StartScreenComponentComponent } from './start-screen-component/start-screen-component.component';


const routes: Routes = [
  { path: '', component: StartScreenComponentComponent },
  { path:'brands', component: BrandsComponent},
  { path:'productView', component: ProductViewComponent},
  { path:'detailView', component: DetailViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
