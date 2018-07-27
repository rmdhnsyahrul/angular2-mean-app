import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  
  books: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBookList();
  }

  getBookList() {
    this.bookService.getAllBooks().then((res) => {
      this.books = res;
    }, (err) => {
      console.log(err);
    })
  }
  
}
