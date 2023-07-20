import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  booksArray: Book[] = [];

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (books) => {
        this.booksArray = books;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`Error: ${err}`);
      },
    });
  }

  shortDescription(book: Book) {
    return `${book.description.slice(0, 150)} ...`;
  }
}
