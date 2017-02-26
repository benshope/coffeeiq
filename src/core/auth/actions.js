import {
  INIT_AUTH,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from './action-types';

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signIn() {
  return {
    type: SIGN_IN
  };
}

export function signInError(error) {
  console.log('signInError called', error);
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  console.log('signInSuccess called', result);
  return {
    type: SIGN_IN_SUCCESS,
    payload: result
  };
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}

export function signOutError() {
  return {
    type: SIGN_OUT_ERROR
  };
}
