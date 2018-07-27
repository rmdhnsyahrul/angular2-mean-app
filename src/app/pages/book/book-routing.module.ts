import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookCreateComponent } from './book-create/book-create.component';

const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: 'edit/:id', component: BookEditComponent },
  { path: 'create', component: BookCreateComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);