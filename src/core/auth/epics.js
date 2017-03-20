// import firebase from 'firebase';
// import { Observable } from 'rxjs';

// import { firebaseAuth } from 'core/firebase';

// import {
//   signInSuccess,
//   signInError,
//   signOutSuccess,
//   signOutError
// } from './actions';

// export function signInEpic(
//   action$
// ) {
//   return action$
//     .filter(action => action.type === SIGN_IN)
//     .map(() => {
//       let provider = new firebase.auth.GoogleAuthProvider();
//       provider.addScope('https://www.googleapis.com/auth/calendar');
//       let signInRequest = firebaseAuth.signInWithPopup(provider)
//           .then(signInSuccess, signInError);
//       return Observable.fromPromise(signInRequest);
//     }).flatMap(x => x);
// }

// export function signOutEpic(
//   action$
// ) {
//   return action$
//     .filter(action => action.type === SIGN_OUT)
//     .map(() => {
//       let signOutRequest = firebaseAuth.signOut()
//         .then(signOutSuccess, signOutError);
//       return Observable.of(signOutRequest);
//     }).flatMap(x => {
//       return x;
//     });
// }

export const authEpics = [];

// /* eslint-disable no-constant-condition */
// import { browserHistory as history } from 'react-router';
// import { call, fork, put, take } from 'redux-saga/effects';
// import { firebaseAuth } from 'core/firebase';
// import { authActions } from './actions';


// function* signIn(authProvider) {
//   try {
//     const authData = yield call([firebaseAuth, firebaseAuth.signInWithPopup], authProvider);
//     yield put(authActions.signInFulfilled(authData.user));
//     yield history.push('/');
//   }
//   catch (error) {
//     yield put(authActions.signInFailed(error));
//   }
// }

// function* signOut() {
//   try {
//     yield call([firebaseAuth, firebaseAuth.signOut]);
//     yield put(authActions.signOutFulfilled());
//     yield history.replace('/sign-in');
//   }
//   catch (error) {
//     yield put(authActions.signOutFailed(error));
//   }
// }


// //=====================================
// //  WATCHERS
// //-------------------------------------

// function* watchSignIn() {
//   while (true) {
//     let { payload } = yield take(authActions.SIGN_IN);
//     yield fork(signIn, payload.authProvider);
//   }
// }

// function* watchSignOut() {
//   while (true) {
//     yield take(authActions.SIGN_OUT);
//     yield fork(signOut);
//   }
// }


// //=====================================
// //  AUTH SAGAS
// //-------------------------------------

// export const authEpics = [
//   fork(watchSignIn),
//   fork(watchSignOut)
// ];
