export const userActions = {
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',

  REMOVE_USER: 'REMOVE_USER',
  REMOVE_USER_FAILED: 'REMOVE_USER_FAILED',
  REMOVE_USER_SUCCESS: 'REMOVE_USER_SUCCESS',

  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

  LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS',

  SHOW_USER_EDIT_FORM: 'SHOW_USER_EDIT_FORM',

  editUser: user => ({
    type: userActions.SHOW_USER_EDIT_FORM,
    payload: user
  }),

  createUser: (user) => ({
    type: userActions.CREATE_USER,
    payload: user
  }),

  createUserFailed: error => ({
    type: userActions.CREATE_USER_FAILED,
    payload: {error}
  }),

  createUserSuccess: user => ({
    type: userActions.CREATE_USER_SUCCESS,
    payload: user
  }),

  removeUser: user => ({
    type: userActions.REMOVE_USER,
    payload: user
  }),

  removeUserFailed: error => ({
    type: userActions.REMOVE_USER_FAILED,
    payload: {error}
  }),

  removeUserSuccess: user => ({
    type: userActions.REMOVE_USER_SUCCESS,
    payload: user
  }),

  toggleUserMembership: (user) => ({
    type: userActions.TOGGLE_USER_MEMBERSHIP,
    payload: user
  }),

  updateUser: (user, changes) => ({
    type: userActions.UPDATE_USER,
    payload: {user, changes}
  }),

  updateUserFailed: error => ({
    type: userActions.UPDATE_USER_FAILED,
    payload: {error}
  }),

  updateUserSuccess: user => ({
    type: userActions.UPDATE_USER_SUCCESS,
    payload: {user}
  }),

  loadUsersSuccess: users => ({
    type: userActions.LOAD_USERS_SUCCESS,
    payload: {users}
  })
};
