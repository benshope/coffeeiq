import * as auth from '../actions/auth';

export interface State {
  loggingIn: boolean;
  loggedIn: boolean;
};

const initialState: State = {
  loggingIn: false,
  loggedIn: false
};

export function reducer(
  state = initialState,
  action: auth.Actions
): State {
  console.log('authReducer called', action);
  if (action.type === auth.ActionTypes.LOG_IN) {
    return {
        loggingIn: true,
        loggedIn: false,
      };
  }
  if (action.type === auth.ActionTypes.LOG_IN_SUCCESS) {
    return {
        loggingIn: false,
        loggedIn: true
      };
  }
  if (action.type === auth.ActionTypes.LOG_IN_FAIL) {
    return {
        loggingIn: false,
        loggedIn: false
      };
  }
  return state;
}
