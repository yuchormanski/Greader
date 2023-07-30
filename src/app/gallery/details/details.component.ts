import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  book: IBook | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId'];
    this.isLoading = false;
    this.bookService.getOneBook(id).subscribe((i) => {
      this.book = i ?? null;
    });
  }

  searchAuthor(author: any) {
    return author?.split(' ').join('+');
  }
}
