import { AngularFireModule, AuthMethods } from 'angularfire2';


const firebaseConfig = {
  apiKey: 'AIzaSyAnqY2lv5g1DsCieEWPPfnnXzUfXlNOUC4',
  authDomain: 'coffeeiq-3d16b.firebaseapp.com',
  databaseURL: 'https://coffeeiq-3d16b.firebaseio.com',
  storageBucket: 'coffeeiq-3d16b.appspot.com',
  messagingSenderId: '109223590360'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
