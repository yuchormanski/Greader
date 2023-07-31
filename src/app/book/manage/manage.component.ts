import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import IBook from 'src/app/models/book.model';
import IUser from 'src/app/models/user.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  bookOrder = '1';
  books: IBook[] = [];
  isLoading: boolean = true;
  activeBook: IBook | null = null;
  user: firebase.User | null = null;
  areYouSure = false;
  theBookId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AngularFireAuth
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.bookOrder = params['sort'] == '2' ? params['sort'] : '1';
    });

    this.bookService.getUserBooks().subscribe((docs) => {
      this.books = [];
      // this.userName = '';
      this.isLoading = false;

      // const currentUser = docs[0];
      // this.userName = currentUser.data().displayName;

      docs.forEach((doc) => {
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

  editBook($event: Event, book: IBook) {
    $event.preventDefault();
    this.activeBook = book;
    this.router.navigate([`/edit/${this.activeBook.docId}`]);
  }

  goToDeleteBook($event: Event, id: string) {
    $event.preventDefault();
    this.areYouSure = true;
    this.theBookId = id;
  }
  doDelete($event: Event) {
    $event.preventDefault();
    console.log(this.theBookId);
    this.bookService.deleteBook(this.theBookId);
    this.router.navigate(['gallery']);
  }
}
