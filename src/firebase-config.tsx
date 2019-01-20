import * as firebase from 'firebase';

// Initialize firebase..
const config = {
  apiKey: 'AIzaSyDEL67WptwvbJIi2NTm95pMfbWqPNyHPj0',
  authDomain: 'airvat-test-79946.firebaseapp.com',
  databaseURL: 'https://airvat-test-79946.firebaseio.com',
  projectId: 'airvat-test-79946',
  storageBucket: 'airvat-test-79946.appspot.com',
  messagingSenderId: '811062575459'
};  

firebase.initializeApp(config);

export const Db = firebase.firestore();

export default firebase;