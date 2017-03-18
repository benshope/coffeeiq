import * as auth from '../actions/auth';

export interface State {
  loggingIn: boolean;
  loggedIn: boolean;
  loggingOut: boolean;
};

const initialState: State = {
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
};

export function reducer(
  state = initialState,
  action: auth.Actions
): State {
  console.log('authReducer called', action);
  if (action.type === auth.ActionTypes.LOG_IN) {
    return {
        ...state,
        loggingIn: true,
      };
  }
  if (action.type === auth.ActionTypes.LOG_IN_SUCCESS) {
    return {
        ...state,
        loggingIn: false,
        loggedIn: true
      };
  }
  if (action.type === auth.ActionTypes.LOG_IN_FAIL) {
    return {
        ...state,
        loggingIn: false,
        loggedIn: false
      };
  }
  if (action.type === auth.ActionTypes.LOG_OUT) {
    return {
        ...state,
        loggingOut: true,
      };
  }
  if (action.type === auth.ActionTypes.LOG_OUT_SUCCESS) {
    return {
        ...state,
        loggingOut: false,
        loggedIn: false
      };
  }
  if (action.type === auth.ActionTypes.LOG_OUT_FAIL) {
    return {
        ...state,
        loggingOut: false,
        loggedIn: true
      };
  }
  return state;
}
