/* eslint-disable no-constant-condition */
import { go } from 'react-router-redux';
import firebase from 'firebase';
import { Observable } from 'rxjs';

import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';


// why no promises here - b/c of rxjs? - lexis
export const signInEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN)
    .map(() => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
      let request = firebaseAuth.signInWithPopup(provider)
          .then(authActions.signInSuccess, authActions.signInError);
      return Observable.fromPromise(request);
    })
    .flatMap(x => x)
    .flatMap(x => {
      return Observable.from([go('/'), x]);
    });
};

export const signOutEpic = (action$) => {
  return action$.filter(action => action.type === authActions.SIGN_OUT)
    .map(() => {
      return Observable.fromPromise(firebaseAuth.signOut()
        .then(authActions.signOutSuccess, authActions.signOutError));
    })
    .flatMap(x => x);
};

export const authEpics = [
  signInEpic,
  signOutEpic
];
