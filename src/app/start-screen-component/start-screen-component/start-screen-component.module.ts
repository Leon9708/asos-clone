import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartScreenComponentRoutingModule } from './start-screen-component-routing.module';
import { StartScreenComponentComponent } from './start-screen-component.component';
import { SharedModule } from 'src/app/shared/shared-module.module';


@NgModule({
  declarations: [
    StartScreenComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StartScreenComponentRoutingModule
  ]
})
export class StartScreenComponentModule { }
