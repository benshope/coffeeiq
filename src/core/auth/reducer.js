import { Record } from 'immutable';
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';

export const AuthState = new Record({
  authenticated: false,
  id: null,
  response: undefined
});

export function authReducer(
  state = new AuthState(),
  {payload, type}
) {
  if (type === SIGN_IN_SUCCESS) {
    return state.merge({
      authenticated: !!payload &&
        !!payload.user,
      id: payload && payload.user &&
        payload.user.uid || null,
      response: payload
    });
  }
  if (type === SIGN_OUT_SUCCESS) {
    return new AuthState();
  }
  return state;
}
