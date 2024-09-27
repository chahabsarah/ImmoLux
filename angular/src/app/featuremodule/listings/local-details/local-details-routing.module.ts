import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalDetailsComponent } from './local-details.component';

const routes: Routes = [{ path: '', component: LocalDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalDetailsRoutingModule { }
