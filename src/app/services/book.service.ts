import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import IBook from '../models/book.model';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public bookCollection: AngularFirestoreCollection<IBook>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.bookCollection = db.collection('books');
  }

  createBook(data: IBook): Promise<DocumentReference<IBook>> {
    return this.bookCollection.add(data);
  }

  getUserBooks() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.bookCollection.ref.where('uid', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBook>).docs)
    );
  }
}
