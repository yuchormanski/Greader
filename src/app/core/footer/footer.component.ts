import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLoading: boolean = true;
  lastThree: IBook[] = [];
  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getFooterBooks(3).subscribe((docs) => {
      this.lastThree = [];
      this.isLoading = false;

      docs.forEach((doc) => {
        this.lastThree?.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  redirectTo(id: string): void {
    this.router.navigate([`/${id}`]);
  }
}
