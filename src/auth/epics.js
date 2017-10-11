import firebase from "firebase";
import { omit } from "lodash";
import { Observable } from "rxjs";
import { firebaseAuth } from "src/firebase";
import { firebaseDb } from "../firebase";
import { authActions } from "./actions";
import { userFromPayload } from "./utils";

export const signInEpic = action$ =>
  action$.filter(action => action.type === authActions.SIGN_IN).flatMap(({ payload }) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    if (payload.isAdmin) {
      provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
    }
    provider.setCustomParameters({
      hd: "*",
      prompt: "consent",
      display: "popup",
      access_type: "offline"
    });
    return firebaseAuth
      .signInWithPopup(provider)
      .then(payload => authActions.signInSuccess(userFromPayload(payload)), x => authActions.signInFailed(x));
  });

// TODO: this should be in a firebase function
export const updateUserEpic = action$ =>
  action$
    .filter(action => action.type === authActions.UPDATE_USER)
    .map(
      ({ payload }) =>
        new Promise((resolve, reject) =>
          firebaseDb
            .ref(`orgs/${payload.orgId}/users/${payload.uid}`)
            .update(omit(payload, "refreshToken"), error => (error ? reject(error) : resolve(payload)))
        )
    )
    .map(payload => authActions.updateUserSuccess(payload))
    .catch(error => Observable.of(authActions.updateUserFailed(error)));

export const signOutEpic = action$ =>
  action$
    .filter(action => action.type === authActions.SIGN_OUT)
    .flatMap(() => firebaseAuth.signOut().then(x => authActions.signOutSuccess(x), x => authActions.signOutFailed(x)));

export const authEpics = [signInEpic, signOutEpic, updateUserEpic];
