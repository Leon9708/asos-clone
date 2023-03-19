import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { ProductRoutingModule } from './product-view-routing.module';
import { SortComponent } from '../product-view/pop-up/sort/sort.component';
import { CategoryComponent } from '../product-view/pop-up/category/category.component';
import { StyleComponent } from '../product-view/pop-up/style/style.component';
import { TypeComponent } from '../product-view/pop-up/type/type.component';
import { ColorComponent } from '../product-view/pop-up/color/color.component';
import { SharedModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [
    ProductViewComponent,
    StyleComponent,
    CategoryComponent,
    SortComponent,
    TypeComponent,
    ColorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductViewModule { }
