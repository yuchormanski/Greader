import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { v4 as uuid } from 'uuid';

import { last, switchMap } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit, OnDestroy {
  user: firebase.User | null = null;
  isDragover = false;
  nextStep = false;
  showAlert = false;
  alertColor = 'green';
  alertMsg = 'Please wait! Your book is being uploaded!';
  inSubmission = false;
  file: File | null = null;
  percentage = 0;
  showPercentage = false;
  task?: AngularFireUploadTask;
  currentYear = new Date().getFullYear();

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private booksService: BookService,
    private router: Router,
    private pageTitle: Title,
    private hasUser: AuthService
  ) {
    auth.user.subscribe((user) => (this.user = user));
    if (!hasUser.isAuthenticated$) {
      router.navigate(['/login']);
    }
  }

  minLengthCount: number = 1;

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Upload page');
  }

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

  // form
  uploadForm = new FormGroup({
    title: this.title,
    author: this.author,
    imgUrl: this.imgUrl,
    language: this.language,
    year: this.year,
    description: this.description,
  });

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== this.fileType()) {
      return;
    }
    this.nextStep = true;
  }

  fileExtension() {
    // return this.file?.name.split('.').pop()?.toLowerCase();
    let ext = this.file?.name.split('.').pop()?.toLowerCase();
    if (ext == 'epub') {
      return 'epub';
    } else if (ext == 'pdf') {
      return 'pdf';
    } else if (ext == 'txt') {
      return 'txt';
    } else {
      return '';
    }
  }

  fileType() {
    if (this.file?.type == 'application/epub+zip') {
      return 'application/epub+zip';
    } else if (this.file?.type == 'text/plain') {
      return 'text/plain';
    } else if (this.file?.type == 'application/pdf') {
      return 'application/pdf';
    } else {
      return false;
    }
  }

  uploadBook() {
    this.uploadForm.disable();

    this.showAlert = true;
    this.alertColor = 'base';
    this.alertMsg = 'Please wait! Your book is being uploaded!';
    this.inSubmission = true;
    this.showPercentage = true;

    const bookFileName = uuid();
    const bookPath = `books/${bookFileName}.${this.fileExtension()}`;

    this.task = this.storage.upload(bookPath, this.file);
    const bookRef = this.storage.ref(bookPath);

    this.task.percentageChanges().subscribe((progress) => {
      this.percentage = (progress as number) / 100;
    });

    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => bookRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          const book = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value.trim(),
            author: this.author.value.trim(),
            imgUrl: this.imgUrl.value.trim(),
            language: this.language.value,
            year: this.year.value,
            description: this.description.value,
            url,
            fileName: this.file?.name as string,
            bookFileName,
            fileType: this.fileExtension(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            creationDate: Date.now(),
            likes: 0,
            downloads: 0,
          };

          const bookDocRef = await this.booksService.createBook(book);

          this.showPercentage = false;
          this.alertColor = 'green';
          this.alertMsg = 'Success! Your book is uploaded!';
          setTimeout(() => {
            this.router.navigate(['gallery', bookDocRef.id]);
          }, 1000);
        },

        error: (error) => {
          this.uploadForm.disable();

          this.alertMsg = 'Upload failed! Please, try again later';
          this.alertColor = 'red';
          this.showPercentage = false;
          this.inSubmission = true;
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }
}
