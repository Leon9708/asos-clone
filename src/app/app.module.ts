import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared-module.module'; 
import { ShareDataService } from './service/share-data.service';
import { ApiAsosService } from './service/api-asos.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    HttpClientModule,
    SharedModule,
  ],
  providers: [ShareDataService,ApiAsosService],
  bootstrap: [AppComponent]
})
export class AppModule { }





