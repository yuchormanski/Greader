import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
// import { ApiService } from 'src/app/api.service';
// import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private bookService: BookService, private pageTitle: Title) {}

  booksArray: IBook[] = [];

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Catalog page');

    this.bookService.getAllBooks().subscribe((docs) => {
      this.booksArray = [];
      this.isLoading = false;

      docs.forEach((doc) => {
        this.booksArray.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  shortDescription(book: IBook) {
    return `${book.description.slice(0, 150)} ...`;
  }
}
