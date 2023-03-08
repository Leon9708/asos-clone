import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponentComponent } from './start-screen-component/start-screen-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrandsComponent } from './brands/brands.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SortComponent } from './product-view/pop-up/sort/sort.component';
import { CategoryComponent } from './product-view/pop-up/category/category.component';
import { StyleComponent } from './product-view/pop-up/style/style.component';
import { ShareDataService } from './service/share-data.service';
import { ApiAsosService } from './service/api-asos.service';
import { TypeComponent } from './product-view/pop-up/type/type.component';
import { ColorComponent } from './product-view/pop-up/color/color.component';



@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponentComponent,
    NavbarComponent,
    BrandsComponent,
    ProductViewComponent,
    NavbarComponent,
    SortComponent,
    CategoryComponent,
    StyleComponent,
    TypeComponent,
    ColorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    HttpClientModule,
  ],
  providers: [ShareDataService,ApiAsosService],
  bootstrap: [AppComponent]
})
export class AppModule { }





