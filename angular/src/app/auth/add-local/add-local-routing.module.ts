import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLocalComponent } from './add-local.component';

const routes: Routes = [{ path: '', component: AddLocalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLocalRoutingModule { }
