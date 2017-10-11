import { firebaseAuth } from "src/firebase";
import { authActions } from "./actions";
import { userFromPayload } from "./utils";

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          dispatch(authActions.signInSuccess(userFromPayload({ user })));
        }
        resolve();
        unsubscribe();
      },
      error => reject(error)
    );
  });
}
