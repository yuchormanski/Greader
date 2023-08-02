import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

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
    });
  }

  searchF(form: NgForm) {
    // if (this.sForm.invalid) {
    //   return;
    // }
    // const { search } = this.searchForm.value;
    // this.searchBooksArray = this.booksArray.filter((b) =>
    //   b.title.toLowerCase().includes(search!.toLowerCase())
    // );
  }
}
