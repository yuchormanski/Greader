import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import IBook from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  book: IBook | null = null;
  minLengthCount: number = 1;
  inSubmission = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  // form fields
  title: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(this.minLengthCount),
    ],
    nonNullable: true,
  });

  author = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  imgUrl = new FormControl('', {
    validators: [Validators.required],
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
      Validators.max(2023),
    ],
    nonNullable: true,
  });
  description = new FormControl('', {
    validators: [Validators.required, Validators.minLength(10)],
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
  // ngOnChanges(changes: SimpleChanges): void {}
  update() {
    this.inSubmission = true;
    const id = this.route.snapshot.params['id'];
    const { title, author, imgUrl, language, year, description } =
      this.editForm.value;

    const updatedData = this.editForm.value;

    this.bookService.updateBook(
      title,
      author!,
      imgUrl!,
      language!,
      year!,
      description!,
      id
    );
  }
}
