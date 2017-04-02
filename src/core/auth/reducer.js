import { authActions } from './actions';

export const newAuthState = {
  authenticated: false,
  uid: null,
  user: null
};

export const AuthState = {...newAuthState};

export function authReducer(state = {...newAuthState}, {payload, type}) {
  switch (type) {
    case authActions.SIGN_IN_SUCCESS:
      return {
        authenticated: true,
        uid: payload.uid,
        user: payload
      };

    case authActions.SIGN_OUT_SUCCESS:
      return {...newAuthState};

    default:
      return state;
  }
}
