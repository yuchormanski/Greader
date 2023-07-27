import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  isDragover = false;
  nextStep = false;
  file: File | null = null;

  constructor() {}

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
    validators: [Validators.required, Validators.minLength(4)],
    nonNullable: true,
  });
  description = new FormControl('', {
    validators: [Validators.required, Validators.minLength(10)],
    nonNullable: true,
  });
  // bookFileType = new FormControl('', {
  //   validators: [Validators.required, Validators.minLength(3)],
  //   nonNullable: true,
  // });

  uploadForm = new FormGroup({
    title: this.title,
    author: this.author,
    imgUrl: this.imgUrl,
    language: this.language,
    year: this.year,
    description: this.description,
    // bookFileType: this.bookFileType,
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
    console.log(this.file);
  }

  // fileExtension() {
  //   if (this.file?.name.includes('epub')) {
  //     return 'ePub';
  //   } else if (this.file?.name.includes('pdf')) {
  //     return 'PDF';
  //   } else if (this.file?.name.includes('txt')) {
  //     return 'TXT';
  //   }
  // }

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
}
