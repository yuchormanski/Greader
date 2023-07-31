import firebase from 'firebase/compat/app';

export default interface IBook {
  title: string;
  author: string;
  imgUrl: string;
  language: string;
  year: string;
  description: string;
  docId?: string;
  uid: string;
  displayName: string;
  url: string;
  fileName: string;
  fileType: string;
  timestamp: firebase.firestore.FieldValue;
  creationDate?: number;
  likes: number;
  downloads: number;
  likedBy?: [];
}
