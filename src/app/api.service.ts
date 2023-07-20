import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from './types/book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooks() {
    const { appUrl } = environment;
    return this.http.get<Book[]>(`${appUrl}/data/books`);
  }

  getOneBook(bookId: string) {
    const { appUrl } = environment;
    return this.http.get<Book>(`${appUrl}/data/books/${bookId}`);
  }

  getFooterBooks() {
    const { appUrl } = environment;
    return this.http.get<Book[]>(
      `${appUrl}/data/books?sortBy=_createdOn`
      // `${appUrl}/data/books?sortBy=_createdOn%20desc`  //in descending order
    );
  }

  // createPost() {
  //   return this.http.post(
  //     'https://greader-b9149-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
  //     {
  //       title: 'First Post Name',
  //       content: 'First Post Content',
  //       author: 'SOme Author',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur expedita aspernatur blanditiis facere nesciunt perspiciatis cum impedit. Quam laborum tempora minus odit, adipisci possimus veritatis neque soluta? Reiciendis reprehenderit eum deserunt iste, unde, distinctio sint explicabo sit cumque consectetur, rerum totam. Repudiandae perferendis eius magnam alias quidem possimus. Voluptates ducimus amet cupiditate, dolore suscipit blanditiis quisquam et cumque eligendi velit laboriosam libero, eveniet neque, itaque fugit a animi minima necessitatibus eius soluta aperiam possimus! Voluptatibus perferendis quos quas sapiente suscipit architecto a ullam, temporibus sint corrupti repellat, enim vitae vero fugit culpa similique aut at dolor accusantium nemo esse ipsum incidunt. Nisi, non deserunt nulla assumenda rerum soluta fuga, ipsa sunt animi illum earum minus facilis cumque alias quo quae vero tenetur! Non perspiciatis et, quis rem eum earum dolor?',
  //     }
  //   );
  // }
}
