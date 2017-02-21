import firebase from 'firebase';
import { firebaseAuth } from 'src/core/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}

export function signInWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  // TODO: Perhaps we will not ask regular users to
  // read or manage their calendars
  // but just in case, here is the readonly scope:
  // https://www.googleapis.com/auth/calendar.readonly
  provider.addScope('https://www.googleapis.com/auth/calendar');
  return authenticate(provider);
}

export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}
