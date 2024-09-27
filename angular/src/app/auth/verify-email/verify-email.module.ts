import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    VerifyEmailRoutingModule,
    FormsModule,
    ReactiveFormsModule  ]
})
export class VerifyEmailModule { }
