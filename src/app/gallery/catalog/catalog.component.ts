import { Component, OnInit } from '@angular/core';
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

  constructor(private bookService: BookService, private pageTitle: Title) {}

  booksArray: IBook[] = [];
  searchBooksArray: IBook[] = [];

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
      this.searchBooksArray = this.booksArray;
    });
  }

  searchForm(form: NgForm) {
    const { search, selection } = form.value;
    if (selection == '1') {
      this.searchBooksArray = this.booksArray.filter((b) =>
        b.title.toLowerCase().includes(search!.toLowerCase())
      );
    } else {
      this.searchBooksArray = this.booksArray.filter((b) =>
        b.author.toLowerCase().includes(search!.toLowerCase())
      );
    }
  }

  // sortingForm(form: NgForm) {
  //   const { selection } = form.value;
  //   if (selection == '1') {
  //     this.searchBooksArray = this.booksArray.sort((a, b) =>
  //       a.author.localeCompare(b.author)
  //     );
  //   } else if (selection == '2') {
  //     this.searchBooksArray = this.booksArray.sort((a, b) =>
  //       a.title.localeCompare(b.title)
  //     );
  //   } else if (selection == '2') {
  //     this.searchBooksArray = this.booksArray.sort((a, b) => b.likes - a.likes);
  //   }
  // }
}
