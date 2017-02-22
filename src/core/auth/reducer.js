import { Record } from 'immutable';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';


export const AuthState = new Record({
  authenticated: false,
  id: null,
  response: undefined
});


export function authReducer(state = new AuthState(), {payload, type}) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return state.merge({
        authenticated: !!payload && !!payload.user,
        id: payload && payload.user && payload.user.uid || null,
        response: payload
      });

    case SIGN_OUT_SUCCESS:
      return new AuthState();

    default:
      return state;
  }
}
