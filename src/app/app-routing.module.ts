import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./start-screen-component/start-screen-component/start-screen-component.module').then(m => m.StartScreenComponentModule) },
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
  { path: 'product-view', loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule) },
  { path: 'detail-view', loadChildren: () => import('./detail-view/detail-view.module').then(m => m.DetailViewModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
