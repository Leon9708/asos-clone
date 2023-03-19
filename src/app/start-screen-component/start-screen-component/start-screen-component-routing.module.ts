import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponentComponent } from './start-screen-component.component';

const routes: Routes = [{ path: '', component: StartScreenComponentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartScreenComponentRoutingModule { }
