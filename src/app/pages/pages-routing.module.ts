// import { NgModule } from '@angular/core'; // because az template doesnt do this for export class
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo:'dashboard', pathMatch:'full'},
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'},
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule'},
      { path: 'books', loadChildren: 'app/pages/book/book.module#BookModule'}
    ]
  }
];

// Angular default export method with ng g module pages --routing
// @NgModule({
//   imports: [
//     ModuleWithProviders,
//     RouterModule.forChild(routes),
//   ],
//   exports: [RouterModule]
// })

// export route based on az template
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
