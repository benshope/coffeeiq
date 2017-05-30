/* eslint-disable no-constant-condition */

import { authActions } from 'core/auth';
// import { userActions } from './actions';
import { userList } from './user-list';

export const userSignInSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map((payload) => {
      var orgId = payload.payload.authUser.email.split('@')[1].replace('.', '_');
      userList.path = `orgs/${orgId}/users`;
      userList.update(payload.payload.authUser.uid, {
        name: payload.payload.authUser.displayName,
        email: payload.payload.authUser.email
        // photoUrl: payload.payload.authUser.photoUrl
      });
      return userList.actionStream();
    })
    .flatMap(x => x);
};

export const userEpics = [
  userSignInSuccessEpic
];
