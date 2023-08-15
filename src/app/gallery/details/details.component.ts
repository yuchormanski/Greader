import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  user: firebase.User | null = null;
  book: IBook | null = null;
  isLoading = true;
  isLiked = false;
  likedArray: string[] = [];
  buttonText = 'LIKE IT';
  buttonColor = '#055c02';
  userId = '';
  hasUser = false;
  downloadAlert = true;
  rating: number = 0;
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
    this.pageTitle.setTitle('GReader - Details page');

    this.userId = this.user?.uid || '';
    const id = this.route.snapshot.params['bookId'];
    this.isLoading = false;

    this.bookService.getOneBook(id).subscribe((i) => {
      this.book = i ?? null;
      this.likedArray = this.book?.likedBy!;
      this.rating = this.book?.downloads! + this.book?.likes!;
      if (this.user && this.book) {
        this.hasUser = true;
        if (!this.likedArray) return;
        if (this.likedArray.includes(this.user.uid)) {
          this.isLiked = true;
          this.buttonText = 'You Already Like It';
          this.buttonColor = '#5a0238';
          this.bookId = id;
        }
      } else if (this.user == null) {
        this.hasUser = false;
      }
    });
  }

  searchAuthor(author: any) {
    return author?.split(' ').join('+');
  }

  async downloadBook($event: Event) {
    const id = this.route.snapshot.params['bookId'];
    try {
      await this.bookService.download(id);
    } catch (error) {
      return console.error(error);
    }
    setTimeout(() => {
      this.downloadAlert = true;
    }, 1500);
  }

  async likeThisBook($event: Event) {
    $event.preventDefault();
    const id = this.route.snapshot.params['bookId'];
    const userId = this.user?.uid;
    if (!this.user) {
      this.router.navigate(['/login']);
    }
    try {
      await this.bookService.likeIt(id, userId!);
    } catch (error) {
      return console.error(error);
    }
    this.isLiked = true;
  }
}
