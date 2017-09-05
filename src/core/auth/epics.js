/* eslint-disable no-constant-condition */
import { go } from "react-router-redux";
import firebase from "firebase";
import { Observable } from "rxjs";

import { firebaseAuth } from "core/firebase";
import { authActions } from "./actions";

// why no promises here - b/c of rxjs? - lexis
export const signInEpic = action$ => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN)
    .flatMap(() => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
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
};

export const signOutEpic = action$ => {
  return action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .map(() => {
      return Observable.fromPromise(
        firebaseAuth
          .signOut()
          .then(authActions.signOutSuccess, authActions.signOutError)
      );
    })
    .flatMap(x => [go("/sign-in"), x]);
};

export const signOutSuccessEpic = action$ => {
  return action$
    .filter(action => action.type === authActions.SIGN_OUT_SUCCESS)
    .filter(() => {
      localStorage.clear();
      let cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      return false;
    });
};

export const authEpics = [signInEpic, signOutEpic, signOutSuccessEpic];
