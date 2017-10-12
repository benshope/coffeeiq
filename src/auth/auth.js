import { firebaseAuth } from "src/firebase";
import { authActions } from "./actions";
import { userFromResponse } from "./utils";

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          dispatch(authActions.signInSuccess(userFromResponse({ user })));
        }
        resolve();
        unsubscribe();
      },
      error => reject(error)
    );
  });
}
