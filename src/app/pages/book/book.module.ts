import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import { routing } from './book-routing.module';
// import { BookRoutingModule } from './book-routing.module';

import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookCreateComponent } from './book-create/book-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookCreateComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
