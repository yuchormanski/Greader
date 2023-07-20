import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  theBook: Book | undefined;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    this.apiService.getOneBook(id).subscribe((book) => {
      this.theBook = book;
      console.log({ book });
    });
    // this.apiService.getOneBook(id).subscribe({
    //   next: (book) => {
    //     this.theBook = book;
    //     this.isLoading = false;
    //     console.log({ book });
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error(`Error: ${err}`);
    //   },
    // });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  searchAuthor(author: any) {
    return author?.split(' ').join('+');
  }
}
