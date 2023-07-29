import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import IBook from 'src/app/models/book.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  bookOrder = '1';
  books: IBook[] = [];
  isLoading: boolean = true;
  userName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.bookOrder = params['sort'] == '2' ? params['sort'] : '1';
    });

    this.bookService.getUserBooks().subscribe((docs) => {
      this.books = [];
      this.userName = '';

      this.isLoading = false;

      const currentUser = docs[0];
      this.userName = currentUser.data().displayName;

      docs.forEach((doc) => {
        console.log(doc.data());
        this.books.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  // sort(event: Event) {
  //   const { value } = event.target.HTMLSelectElement;
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       sort: value,
  //     },
  //   });
  // }
}
