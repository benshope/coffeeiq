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
      return request.then(() => go("/"), console.warn);
    })
    .filter(x => x);

export const signOutEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .flatMap(() =>
      firebaseAuth
        .signOut()
        .then(authActions.signOutSuccess, authActions.signOutError)
    );

export const signOutSuccessEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT_SUCCESS)
    .map(() => {
      localStorage.clear();
      let cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      return go("/sign-in");
    });

export const authEpics = [signInEpic, signOutEpic, signOutSuccessEpic];
