/* eslint-disable no-constant-condition */
import firebase from "firebase";
// import { Observable } from "rxjs";
// import history from "src/history";

import { firebaseAuth } from "src/firebase";
import { authActions } from "./actions";

export const signInEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_IN)
    .flatMap(({ payload }) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      if (payload.isAdmin) {
        provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
      }
      provider.setCustomParameters({
        hd: "*",
        prompt: "consent",
        display: "popup",
        access_type: "offline" // eslint-disable-line camelcase
      });
      return firebaseAuth
        .signInWithPopup(provider)
        .then(
          x => authActions.signInSuccess(x),
          x => authActions.signInError(x)
        );
    });

export const signOutEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .flatMap(() =>
      firebaseAuth
        .signOut()
        .then(
          x => authActions.signOutSuccess(x),
          x => authActions.signOutError(x)
        )
    );

export const authEpics = [signInEpic, signOutEpic];
