/* eslint-disable no-constant-condition */
import { go } from "react-router-redux";
import firebase from "firebase";
import { Observable } from "rxjs";

import { firebaseAuth } from "core/firebase";
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
      let request = firebaseAuth
        .signInWithPopup(provider)
        .then(authActions.signInSuccess, authActions.signInError);
      return request.then(() => go("/groups"), console.warn);
    })
    .filter(x => x);

export const signOutEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .flatMap(() =>
      Observable.from([
        Observable.of(go("/")),
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
