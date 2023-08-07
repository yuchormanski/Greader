import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  isLoading: boolean = true;
  p: number = 1;

  constructor(private bookService: BookService, private pageTitle: Title) {}

  booksArray: IBook[] = [];
  searchBooksArray: IBook[] = [];

  ngOnInit() {
    this.pageTitle.setTitle('GReader - Catalog page');
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe((docs) => {
      this.booksArray = [];
      this.isLoading = false;

      docs.forEach((doc) => {
        this.booksArray.push({
          docId: doc.id,
          rating: doc.data().downloads! + doc.data().likes!,
          ...doc.data(),
        });
      });
      this.searchBooksArray = this.booksArray;
    });
  }

  searchForm(form: NgForm) {
    const { search, selection } = form.value;
    if (selection == '1') {
      this.searchBooksArray = this.booksArray.filter((b) =>
        b.title.toLowerCase().includes(search!.toLowerCase())
      );
    } else if (selection == '2') {
      this.searchBooksArray = this.booksArray.filter((b) =>
        b.author.toLowerCase().includes(search!.toLowerCase())
      );
    }
    if (this.searchBooksArray.length === 0) {
    }
  }

  sortingForm(sortForm: NgForm) {
    const { sorting } = sortForm.value;
    console.log(sorting);

    if (sorting == '1') {
      this.searchBooksArray = this.booksArray.sort((a, b) =>
        a.author.localeCompare(b.author)
      );
    } else if (sorting == '2') {
      this.searchBooksArray = this.booksArray.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sorting == '3') {
      this.searchBooksArray = this.booksArray.sort(
        (a, b) =>
          b.downloads! + b.likes! - (a.downloads! + a.likes!) ||
          b.downloads! - a.downloads! ||
          b.likes! - a.likes!
      );
      // this.searchBooksArray = this.booksArray.sort(
      //   (a, b) => b.likes! - a.likes! || b.downloads! - a.downloads!
      // );
    } else if (sorting == '4') {
      this.searchBooksArray = this.booksArray.filter(
        (b) => b.language == 'Bulgarian'
      );
    } else if (sorting == '5') {
      this.searchBooksArray = this.booksArray.filter(
        (b) => b.language == 'English'
      );
    } else if (sorting == '6') {
      this.searchBooksArray = this.booksArray.filter(
        (b) => b.language == 'German'
      );
    }
  }
}
