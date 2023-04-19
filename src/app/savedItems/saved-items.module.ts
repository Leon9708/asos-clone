import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedItemsRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './saved-items.component';
import { SharedModule } from '../shared/shared-module.module';


@NgModule({
  declarations: [
    SavedItemsComponent
  ],
  imports: [
    CommonModule,
    SavedItemsRoutingModule,
    SharedModule
  ]
})
export class SavedItemsModule { }
