import { authActions } from "./actions";

export const newAuthState = {
  authenticated: false,
  uid: null,
  user: null
};

export const AuthState = { ...newAuthState };

export function authReducer(state = { ...newAuthState }, { payload, type }) {
  console.log("ACTION", type, payload);
  if (type === authActions.SIGN_IN_SUCCESS) {
    return {
      authenticated: true,
      uid: payload.user.uid,
      user: {
        uid: payload.user.uid,
        photoUrl: payload.user.photoUrl,
        displayName: payload.user.displayName,
        email: payload.user.email,
        orgId: payload.user.email.split("@")[1].replace(".", "_"),
        orgName: payload.user.email.split("@")[1].split(".")[0]
      }
    };
  }
  if (type === authActions.SIGN_OUT) {
    return { ...state, loggingOut: true };
  }
  if (type === authActions.SIGN_OUT_SUCCESS) {
    return { ...newAuthState };
  }
  if (type === authActions.SIGN_OUT_ERROR) {
    return { ...state, loggingOut: false };
  }
  return state;
}
