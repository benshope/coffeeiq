/* eslint-disable no-constant-condition */
// import { go } from "react-router-redux";
import firebase from "firebase";
import { Observable } from "rxjs";
import history from "src/history";

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
          x =>
            Observable.from([
              authActions.signInSuccess(x),
              history.push("/groups")
            ]),
          x => Observable.of(authActions.signInError(x))
        );
    })
    .flatMap(x => x);

export const signOutEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .flatMap(() =>
      Observable.from([
        Observable.of(history.replace("/")),
        firebaseAuth
          .signOut()
          .then(
            x => authActions.signOutSuccess(x),
            x => authActions.signOutError(x)
          )
      ])
    )
    .flatMap(x => x);

export const authEpics = [signInEpic, signOutEpic];
