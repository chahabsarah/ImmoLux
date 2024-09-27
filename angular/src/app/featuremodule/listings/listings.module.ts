import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { ListingsComponent } from './listings.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateLocalComponent } from './update-local/update-local.component';
import { LocalDetailsComponent } from './local-details/local-details.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [ListingsComponent, MyPostsComponent, DashboardComponent, UpdateLocalComponent, LocalDetailsComponent, UserManagementComponent],
  imports: [CommonModule, ListingsRoutingModule, SharedModule],
})
export class ListingsModule {}
