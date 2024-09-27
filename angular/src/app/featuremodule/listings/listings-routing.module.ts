import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings.component';

const routes: Routes = [
  { path: '', component: ListingsComponent,children:[ {
    path: 'listing-grid',
    loadChildren: () =>
      import('./annonces/annonces.module').then(
        (m) => m.ListingGridModule
      ),
  },
  {
    path: 'my-posts',
    loadChildren: () =>
      import('./my-posts/my-posts.module').then(
        (m) => m.MyPostsModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./update-local/update-local.module').then(
        (m) => m.UpdateLocalModule
      ),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./local-details/local-details.module').then(
        (m) => m.LocalDetailsModule
      ),
  },
  {
    path: 'listing-grid-sidebar',
    loadChildren: () =>
      import('./listing-grid-sidebar/listing-grid-sidebar.module').then(
        (m) => m.ListingGridSidebarModule
      ),
  },
  {
    path: 'listing-list-sidebar',
    loadChildren: () =>
      import('./listing-list-sidebar/listing-list-sidebar.module').then(
        (m) => m.ListingListSidebarModule
      ),
  },
  {
    path: 'listingmap-grid',
    loadChildren: () =>
      import('./listingmap-grid/listingmap-grid.module').then(
        (m) => m.ListingmapGridModule
      ),
  },
  {
    path: 'listingmap-list',
    loadChildren: () =>
      import('./listingmap-list/listingmap-list.module').then(
        (m) => m.ListingmapListModule
      ),
  },

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
