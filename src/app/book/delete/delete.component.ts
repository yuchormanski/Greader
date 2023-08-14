import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  user: firebase.User | null = null;
  book: IBook | null = null;
  isLoading = true;
  buttonColor = '#055c02';
  hasAction = false;
  isAuth = false;
  deletePanel: boolean = false;
  message = 'You are about to delete this book!';
  bookId = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AngularFireAuth,
    private router: Router,
    private pageTitle: Title
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Delete page');
    const id = this.route.snapshot.params['id'];
    this.message = 'You are about to delete this book!';
    this.isLoading = false;
    this.bookService.getOneBook(id).subscribe((i) => {
      this.book = i ?? null;

      if (this.book?.uid != this.user?.uid!) {
        this.message = 'You are not the owner on this book!';
        this.deletePanel = this.book?.uid == this.user?.uid!;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      }
      this.bookId = id;
      this.deletePanel = this.book?.uid == this.user?.uid!;
    });
  }

  getBack() {
    this.hasAction = true;
    this.message = 'Good decision!';
    setTimeout(() => {
      this.router.navigate(['manage']);
    }, 1500);
  }

  async sorryAboutThat(book: IBook) {
    const id = this.route.snapshot.params['id'];
    this.hasAction = true;

    await this.bookService.deleteBook(id, book);
    // setTimeout(() => {
    //   this.message = 'Please, wait! Deletion is in process!';
    // }, 1000);
    this.router.navigate(['/gallery']);
  }
}
