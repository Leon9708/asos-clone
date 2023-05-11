import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReloadGuard } from './reload.guard'; // Add this import

const routes: Routes = [
  { path: '', loadChildren: () => import('./start-screen-component/start-screen-component/start-screen-component.module').then(m => m.StartScreenComponentModule), canActivate: [ReloadGuard] },
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
  { path: 'product-view', loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule) },
  { path: 'detail-view', loadChildren: () => import('./detail-view/detail-view.module').then(m => m.DetailViewModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'savedItems', loadChildren: () => import('./savedItems/saved-items.module').then(m => m.SavedItemsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [ReloadGuard]
})
export class AppRoutingModule { }