import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateLocalComponent } from './update-local.component';

const routes: Routes = [{ path: '', component: UpdateLocalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateLocalRoutingModule { }
