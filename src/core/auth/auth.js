import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';


export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          dispatch(authActions.signInSuccess(authUser));
        }

        resolve(); // why do you have to call resolve and unsubscribe here? - lexis
        unsubscribe();
      },

      error => reject(error)
    );
  });
}
