import { firebaseAuth } from "src/firebase";
import { authActions } from "./actions";

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          dispatch(authActions.signInSuccess({ user }));
        }
        resolve();
        unsubscribe();
      },
      error => reject(error)
    );
  });
}
