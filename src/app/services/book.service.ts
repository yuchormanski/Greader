import { Injectable } from '@angular/core';
// import { getFirestore, doc, getDoc, FieldPath } from 'firebase/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import IBook from '../models/book.model';
import { switchMap, map, timestamp } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

import {
  Firestore,
  collectionData,
  deleteDoc,
  limit,
  limitToLast,
  orderBy,
  increment,
  addDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

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
    // console.log(currentUser);
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
        // if (!user) {
        //   return of([]);
        // }
        const query = this.bookCollection.ref;
        return query.get();
      })
    );
  }
  getOneBook(id: string) {
    return this.bookCollection.doc(id).valueChanges();
  }

  getLimitBooks(limit: number) {
    return this.auth.user.pipe(
      switchMap((user) => {
        const query = this.bookCollection.ref
          .orderBy('likes', 'desc')
          .limit(limit);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBook>).docs)
    );
  }

  getFooterBooks(limit: number) {
    return this.auth.user.pipe(
      switchMap((user) => {
        const query = this.bookCollection.ref
          .orderBy('timestamp', 'desc')
          .limit(limit);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBook>).docs)
    );
  }

  updateBook(
    title: string,
    author: string,
    imgUrl: string,
    language: string,
    year: string,
    description: string,
    id: string
  ) {
    return this.bookCollection
      .doc(id)
      .update({ title, author, imgUrl, language, year, description });
  }

  likeIt(id: string) {}
}
