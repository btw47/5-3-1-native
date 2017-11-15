import * as firebase from 'firebase';

//-----FIREBASE DB SETUP-----
var config = {
  apiKey: 'AIzaSyC9bbhp7Cap29-7aUM6BiuctwmTt3wrxC0',
  authDomain: 'app-ffb9e.firebaseapp.com',
  databaseURL: 'https://app-ffb9e.firebaseio.com',
  projectId: 'app-ffb9e',
  messagingSenderId: '901369793373'
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
