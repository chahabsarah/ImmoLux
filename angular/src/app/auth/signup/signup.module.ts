import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class SignupModule { }
