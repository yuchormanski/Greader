import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';
// import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  book: IBook | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId'];

    this.bookService.getOneBook(id).then((data) => {
      this.book = data as IBook;
      console.log(data);
    });
  }

  ngAfterViewInit(): void {}

  searchAuthor(author: any) {
    return author?.split(' ').join('+');
  }
}
