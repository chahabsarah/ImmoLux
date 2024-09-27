import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnonceRoutingModule } from './annonces-routing.module';
import { AnnonceComponent } from './annonces.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/app-filter.pipe';


@NgModule({
  declarations: [
    AnnonceComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    AnnonceRoutingModule,
    FormsModule

  ]
})
export class ListingGridModule { }
