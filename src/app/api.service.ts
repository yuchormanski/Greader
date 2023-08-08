// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Book } from './types/book';
// import { environment } from 'src/environments/environment';

// // const { apiUrl } = environment;

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   constructor(private http: HttpClient) {}

//   getBooks() {
//     return this.http.get<Book[]>(`/api/books`);
//   }

//   getOneBook(bookId: string) {
//     return this.http.get<Book>(`/api/books/${bookId}`);
//   }

//   getFooterBooks() {
//     return this.http.get<Book[]>(`/api/books?sortBy=\_createdOn%20`);
//   }
// }
