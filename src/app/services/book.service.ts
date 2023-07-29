import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import IBook from '../models/book.model';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

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

  getUserInfo() {
    const currentUser = this.auth.user;
    console.log(currentUser);

    return currentUser;
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

  getAllBooks() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.bookCollection.ref;
        return query.get();
      })
    );
  }

  async getOneBook(bookId: string) {
    const currentDB = getFirestore();
    const docRef = doc(currentDB, 'books', bookId);
    const docSnap = await getDoc(docRef);
    const result = await docSnap.data();
    return result;
  }

  getLimitBooks(limit: number) {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.bookCollection.ref.limit(limit);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBook>).docs)
    );
  }
}
