import { authActions } from "./actions";

export const newAuthState = {
  authenticated: false,
  uid: null,
  user: null
};

export const AuthState = { ...newAuthState };

export function authReducer(state = { ...newAuthState }, { payload, type }) {
  switch (type) {
    case authActions.SIGN_IN_SUCCESS:
      return {
        authenticated: true,
        uid: payload.authUser.uid,
        user: {
          uid: payload.authUser.uid,
          // photoUrl: payload.authUser.photoUrl,
          displayName: payload.authUser.displayName,
          email: payload.authUser.email,
          orgId: payload.authUser.email.split("@")[1].replace(".", "_"),
          orgName: payload.authUser.email.split("@")[1].split(".")[0]
        }
      };

    case authActions.SIGN_OUT_SUCCESS:
      return { ...newAuthState };

    default:
      return state;
  }
}
