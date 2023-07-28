import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import IBook from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public bookCollection: AngularFirestoreCollection<IBook>;

  constructor(private db: AngularFirestore) {
    this.bookCollection = db.collection('books');
  }

  createBook(data: IBook): Promise<DocumentReference<IBook>> {
    return this.bookCollection.add(data);
  }
}
