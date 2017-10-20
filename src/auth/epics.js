import firebase from "firebase";
import { omit } from "lodash";
// import { push } from "react-router-redux";
import { Observable } from "rxjs";
import { firebaseAuth } from "src/firebase";
import { firebaseDb } from "../firebase";
import { authActions } from "./actions";
import { userFromResponse } from "./utils";

// export const goToGroupsPage = (action$, store) =>
//   action$
//     .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
//     .map(() => push("/groups"));

export const signInEpic = action$ => {
  console.log(action$);
  return action$.filter(action => action.type === authActions.SIGN_IN).flatMap(({ payload }) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    if (payload) {
      provider.addScope("https://www.googleapis.com/auth/calendar");
    }
    provider.setCustomParameters({
      hd: "*",
      prompt: "consent",
      display: "popup",
      access_type: "offline"
    });
    return firebaseAuth
      .signInWithPopup(provider)
      .then(
        response => authActions.signInSuccess(userFromResponse(response, payload)),
        x => authActions.signInFailed(x)
      );
  });
};

// TODO: this should be in a firebase function
export const updateUserEpic = action$ =>
  action$
    .filter(action => action && action.type === authActions.SIGN_IN_SUCCESS)
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
    .filter(action => action && action.type === authActions.SIGN_OUT)
    .flatMap(() => firebaseAuth.signOut().then(x => authActions.signOutSuccess(x), x => authActions.signOutFailed(x)));

export const authEpics = [signInEpic, signOutEpic, updateUserEpic];
