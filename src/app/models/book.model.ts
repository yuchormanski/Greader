import firebase from 'firebase/compat/app';

export default interface IBook {
  uid: string;
  displayName: string;
  title: string;
  author: string;
  imgUrl: string;
  language: string;
  year: string;
  description: string;
  url: string;
  fileName: string;
  fileType: string;
  timestamp: firebase.firestore.FieldValue;
}
