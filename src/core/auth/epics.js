/* eslint-disable no-constant-condition */
import { push } from 'react-router-redux';
import firebase from 'firebase';
import { Observable } from 'rxjs';

import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';

export const signInEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN)
    .map(() => {
      console.log('signInEpic called');
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/calendar');
      return Observable.fromPromise(firebaseAuth.signInWithPopup(provider)
          .then(
            (x) => {
              console.log('signInSuccess promise');
              return authActions.signInSuccess(x);
            },
            authActions.signInError));
    })
      .flatMap((action) => {
        console.log('SHOULD BE ACTION', action);
        return Observable.of(push('/'));
      })
      .catch(console.warn);
};

export const signOutEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .map(() => {
      console.log('signOutEpic called');
      return Observable.fromPromise(firebaseAuth.signOut()
        .then(
          (x) => {
            console.log('signOutSuccess promise');
            return authActions.signOutSuccess(x);
          },
          authActions.signOutError));
    })
      .flatMap((action) => {
        console.log('SHOULD BE ACTION', action);
        return Observable.of(push('/sign-in'));
      })
      .catch(console.warn);
};

export const authEpics = [
  signInEpic,
  signOutEpic
];
