import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import IBook from '../models/book.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Greed to read';
  limitedBooks: IBook[] | null = null;
  isLoading: boolean = true;

  constructor(
    private bookService: BookService,
    private router: Router,
    private pageTitle: Title
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Home page');

    this.bookService.getLimitBooks(3).subscribe((docs) => {
      this.limitedBooks = [];
      this.isLoading = false;

      docs.forEach((doc) => {
        this.limitedBooks?.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    });
  }
}
