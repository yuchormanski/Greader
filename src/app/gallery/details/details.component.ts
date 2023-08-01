import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  user: firebase.User | null = null;
  book: IBook | null = null;
  isLoading = true;
  isLiked = false;
  likedArray: string[] = [];
  buttonText = 'LIKE IT';
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
    const id = this.route.snapshot.params['bookId'];
    this.isLoading = false;
    this.bookService.getOneBook(id).subscribe((i) => {
      this.book = i ?? null;
      this.likedArray = this.book?.likedBy!;
      if (this.user && this.book) {
        if (this.likedArray.includes(this.user.uid)) {
          this.isLiked = true;
          this.buttonText = 'Already Like It';
          this.buttonColor = '#5a0238';
        }
      }
    });
  }

  ngAfterViewInit(): void {}

  searchAuthor(author: any) {
    return author?.split(' ').join('+');
  }

  downloadBook($event: Event) {
    // $event.preventDefault();
    const id = this.route.snapshot.params['bookId'];
    this.bookService.download(id);
  }

  likeThisBook($event: Event) {
    $event.preventDefault();
    const id = this.route.snapshot.params['bookId'];
    const userId = this.user?.uid;
    if (!this.user) {
      this.router.navigate(['/login']);
    }

    this.bookService.likeIt(id, userId!);
    this.isLiked = true;
  }
}
