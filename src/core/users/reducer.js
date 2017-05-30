import { authActions, userActions } from './actions';

const newUsersState = {
  list: undefined
};

export function usersReducer(state = {...newUsersState}, {payload, type}) {
  if (type === userActions.LOAD_USERS_SUCCESS) {
    return { ...state, list: payload.users };
  }
  if (type === authActions.SIGN_OUT_SUCCESS) {
    return {...newUsersState};
  }
  return state;
}
