import { ModuleWithProviders } from '@angular/core';
import { AngularFireModule, AuthMethods } from 'angularfire2';


const firebaseConfig = {
  apiKey: 'AIzaSyAPfBhV6dR6K1ifnaGMo403w8yMIGTNfl0',
  authDomain: 'coffeeiq-228b6.firebaseapp.com',
  databaseURL: 'https://coffeeiq-228b6.firebaseio.com',
  storageBucket: 'coffeeiq-228b6.appspot.com',
  messagingSenderId: '515941571789'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(
  firebaseConfig,
  firebaseAuthConfig);
