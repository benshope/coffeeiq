import firebase from 'firebase';
import { Observable } from 'rxjs';

import { firebaseAuth } from 'src/core/firebase';

import {
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError
} from './actions';
import {
  SIGN_IN,
  SIGN_OUT
} from './action-types';

export function signInEpic(
  action$
) {
  return action$
    .filter(action => action.type === SIGN_IN)
    .map(() => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/calendar');
      let signInRequest = firebaseAuth.signInWithPopup(provider)
          .then(signInSuccess, signInError);
      return Observable.fromPromise(signInRequest);
    }).flatMap(x => x);
}

export function signOutEpic(
  action$
) {
  return action$
    .filter(action => action.type === SIGN_OUT)
    .map(() => {
      let signOutRequest = firebaseAuth.signOut()
        .then(signOutSuccess, signOutError);
      return Observable.of(signOutRequest);
    }).flatMap(x => {
      return x;
    });
}
