/* eslint-disable no-constant-condition */

import { authActions } from 'core/auth';
// import { userActions } from './actions';
import { userList } from './user-list';

export const userSignInSuccessEpic = (action$) => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .map((payload) => {
      console.log(
        'SIGN_IN_SUCCESS epic called',
        payload,
        userList);
      var orgId = payload.payload.authUser.email.split('@')[1].replace('.', '_');
      userList.path = `orgs/${orgId}/users`;
      userList.update(payload.payload.authUser.uid, {
        name: payload.payload.authUser.name || 'ben',
        email: payload.payload.authUser.email
      });
      return userList.actionStream();
    })
    .flatMap(x => x);
};

export const userEpics = [
  userSignInSuccessEpic
];
