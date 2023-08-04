import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  book: IBook | null = null;
  minLengthCount: number = 1;
  inSubmission = false;
  showAlert = false;
  alertColor = 'green';
  alertMsg = 'Please wait! Your book information is being updated!';
  currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private pageTitle: Title
  ) {}

  // form fields
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(this.minLengthCount),
    ],
    nonNullable: true,
  });

  author = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    nonNullable: true,
  });

  imgUrl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^https?://.+(.png|.jpg|.jpeg)$'),
    ],
    nonNullable: true,
  });

  language = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  year = new FormControl('', {
    validators: [
      Validators.required,
      Validators.min(1800),
      Validators.max(this.currentYear),
      Validators.pattern(/^\d+$/),
    ],
    nonNullable: true,
  });

  description = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(8000),
    ],
    nonNullable: true,
  });

  // bookId = new FormControl('', { nonNullable: true });

  // form
  editForm = new FormGroup({
    title: this.title,
    author: this.author,
    imgUrl: this.imgUrl,
    language: this.language,
    year: this.year,
    description: this.description,
    // id: this.bookId,
  });

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Edit page');

    this.showAlert = false;
    this.showAlert = false;
    this.alertColor = 'green';
    this.alertMsg = 'Please wait! Your book information is being updated!';

    const id = this.route.snapshot.params['id'];

    // this.bookService.getOneBook(id).subscribe((b) => (this.book = b ?? null));
    this.bookService.getOneBook(id).subscribe((b) => {
      const { title, author, imgUrl, language, year, description } = { ...b };
      this.title.setValue(title as string);
      this.author.setValue(author as string);
      this.imgUrl.setValue(imgUrl as string);
      this.language.setValue(language as string);
      this.year.setValue(year as string);
      this.description.setValue(description as string);
    });
  }
  async update() {
    this.editForm.disable();

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'green';
    this.alertMsg = 'Please wait! Your book is being uploaded!';

    const id = this.route.snapshot.params['id'];
    const { title, author, imgUrl, language, year, description } =
      this.editForm.value;

    const updatedData = this.editForm.value;

    try {
      await this.bookService.updateBook(
        title!,
        author!,
        imgUrl!,
        language!,
        year!,
        description!,
        id
      );
    } catch (error) {
      this.showAlert = true;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong! Please try again later';
      this.inSubmission = false;
      return;
    }

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';

    setTimeout(() => this.router.navigate([`/gallery/${id}`]), 1000);
  }
}
