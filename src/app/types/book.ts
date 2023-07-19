export interface Book {
  _ownerId: string;
  author: string;
  comments: userComment[];
  description: string;
  genre: string;
  imgUrl: string;
  title: string;
  year: number;
}

interface userComment {
  comment: string;
  'comment-author': string;
}
