import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  book: IBook | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.bookService.getOneBook(id).then((data) => {
      this.book = data as IBook;
    });
  }
}
