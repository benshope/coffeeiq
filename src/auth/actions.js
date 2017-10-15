const action = type => payload => ({ type, payload });

const authActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",

  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED: "UPDATE_USER_FAILED",

  SIGN_OUT: "SIGN_OUT",
  SIGN_OUT_FAILED: "SIGN_OUT_FAILED",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS"
};

export const authActions = {
  ...authActionTypes,

  updateUserSuccess: action(authActionTypes.UPDATE_USER_SUCCESS),
  updateUserFailed: action(authActionTypes.UPDATE_USER_FAILED),
  signIn: action(authActionTypes.SIGN_IN),

  signInFailed: error => ({
    type: authActionTypes.SIGN_IN_FAILED,
    payload: { error }
  }),

  signInSuccess: payload => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload
  }),

  signOut: () => ({
    type: authActionTypes.SIGN_OUT
  }),

  signOutFailed: error => ({
    type: authActionTypes.SIGN_OUT_FAILED,
    payload: { error }
  }),

  signOutSuccess: () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
  })
};
