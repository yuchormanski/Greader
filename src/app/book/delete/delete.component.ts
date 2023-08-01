import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

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

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);

    this.isLoading = false;
    this.bookService.getOneBook(id).subscribe((i) => {
      this.book = i ?? null;
    });
  }
}
