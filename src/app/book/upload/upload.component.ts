import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { v4 as uuid } from 'uuid';

import { last, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
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

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  // form fields
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
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
  fileExt: string = '';

  // form
  uploadForm = new FormGroup({
    title: this.title,
    author: this.author,
    imgUrl: this.imgUrl,
    language: this.language,
    year: this.year,
    description: this.description,
    // bookFileType: this.fileExtension(),
  });

  ngOnInit(): void {}

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== this.fileType()) {
      return;
    }
    // this.bookFileType.setValue(this.fileExtension()!);
    this.nextStep = true;
  }

  fileExtension() {
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
    console.log('File is uploaded');

    this.showAlert = true;
    this.alertColor = 'base';
    this.alertMsg = 'Please wait! Your book is being uploaded!';
    this.inSubmission = true;
    this.showPercentage = true;

    const bookFileName = uuid();
    const bookPath = `books/${bookFileName}.${this.fileExtension()}`;

    // console.log(this.file);

    const task = this.storage.upload(bookPath, this.file);
    const bookRef = this.storage.ref(bookPath);

    task.percentageChanges().subscribe((progress) => {
      this.percentage = (progress as number) / 100;
    });

    task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => bookRef.getDownloadURL())
      )
      .subscribe({
        next: (url) => {
          const book = {
            uid: this.user?.uid,
            displayName: this.user?.displayName,
            title: this.title.value,
            author: this.author.value,
            imgUrl: this.imgUrl.value,
            language: this.language.value,
            year: this.year.value,
            description: this.description.value,
            url,
            fileName: `${this.file?.name}.${this.fileExtension()}`,
          };

          console.log(book);

          this.showPercentage = false;
          this.alertColor = 'green';
          this.alertMsg = 'Success! Your book is uploaded!';
        },
        error: (error) => {
          this.alertMsg = 'Upload failed! Please, try again later';
          this.alertColor = 'red';
          this.showPercentage = false;
          this.inSubmission = true;
          console.error(error);
        },
      });
  }
}
