import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLocalRoutingModule } from './add-local-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddLocalComponent } from './add-local.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AddLocalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AddLocalModule { }
