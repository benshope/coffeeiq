import { userActions } from './actions';

const newUsersState = {
  list: undefined
};

export function usersReducer(state = {...newUsersState}, {payload, type}) {
  if (type === userActions.LOAD_USERS_SUCCESS) {
    return { ...state, list: payload.users };
  }
  return state;
}
