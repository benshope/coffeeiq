import { authActions } from "./actions";

export const newAuthState = {
  authenticated: false
};

export const AuthState = { ...newAuthState };

// TODO: use an object with functions as a case switch
export function authReducer(state = { ...newAuthState }, { payload, type }) {
  if (type === authActions.SIGN_IN_SUCCESS) {
    return {
      authenticated: true,
      ...payload
    };
  }
  if (type === authActions.SIGN_OUT_SUCCESS) {
    return { ...newAuthState };
  }
  return state;
}
