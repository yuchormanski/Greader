import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
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

  async createBook(data: IBook) {
    await this.bookCollection.add(data);
  }
}
