/* eslint-disable no-constant-condition */
import { Observable } from "rxjs";

import { authActions } from "src/auth";

import { firebaseDb } from "../firebase";
import { groupActions } from "./actions";

let firebaseRefObserver;
const firebaseRef$ = Observable.create(observer => {
  latestRefObserver = observer;
}).last();

export const signInSuccessEpic = action$ => {
  return action$
    .filter(action => action.type === authActions.SIGN_IN_SUCCESS)
    .filter(payload => {
      var orgId = payload.payload.authUser.email
        .split("@")[1]
        .replace(".", "_");
      firebaseRefObserver.next(firebaseDb.ref(`orgs/${orgId}/groups`));
    });
};

export const groupsUpdatesEpic = () =>
  firebaseRef$.flatMap(ref => {
    const unwrap = snapshot => ({ key: snapshot.key, value: snapshot.val() });
    return Observable.create(observer => {
      ref.once("value", value => {
        console.log("VALUE ON GROUPS REF", value);
        observer.next(groupActions.getGroupsSuccess([]));
      });
      ref.on("child_added", snapshot =>
        observer.next(groupActions.createGroupSuccess(unwrap(snapshot)))
      );
      ref.on("child_changed", snapshot =>
        observer.next(groupActions.updateGroupSuccess(unwrap(snapshot)))
      );
      ref.on("child_deleted", snapshot =>
        observer.next(groupActions.deleteGroupSuccess(unwrap(snapshot)))
      );
    });
  });

// export const createGroupEpic = action$ => {
//   return combineLatest(
//     action$.filter(action => action.type === groupActions.CREATE_GROUP),
//     firebaseRef$
//   ).flatMap(({ action, ref }) => {
//     return new Promise((resolve, reject) =>
//       ref.push(value, error => (error ? reject(error) : resolve()))
//     ).then(
//       (() => groupActions.createGroupSuccess(action),
//       error => groupActions.createGroupError(error))
//     );
//   });
// };

// export const toggleGroupMembershipEpic = (action$, store) => {
//   return action$
//     .filter(action => action.type === groupActions.TOGGLE_GROUP_MEMBERSHIP)
//     .map(action => {
//       const group = action.payload;
//       const state = store.getState();
//       const auth = state.auth;
//       // const user = state.users.list.find((u) => u.key === auth.uid);
//       const toggleOn = !group.userIds || !group.userIds[auth.uid];
//       var updates = {};
//       updates[`groups/${group.key}/userIds/${auth.uid}`] = toggleOn;
//       updates[`users/${auth.uid}/groupIds/${group.key}`] = toggleOn;
//       return firebaseDb.ref(`orgs/${auth.user.orgId}`).update(updates);
//     })
//     .filter(() => false);
// };

// export const updateGroupEpic = action$ => {
//   return action$
//     .filter(action => action.type === groupActions.UPDATE_GROUP)
//     .map(action => {
//       return Observable.fromPromise(
//         groupList.update(action.payload.key, action.payload)
//       );
//     })
//     .flatMap(x => x);
// };

// export const deleteGroupEpic = action$ => {
//   return action$
//     .filter(action => action.type === groupActions.DELETE_GROUP)
//     .map(action => {
//       return Observable.fromPromise(
//         groupList
//           .delete(action.payload)
//           .then(() => groupActions.deleteGroupSuccess(action.payload))
//       );
//     })
//     .flatMap(x => x);
// };

export const groupEpics = [
  listActionsEpic,
  signInSuccessEpic
  // createGroupEpic,
  // updateGroupEpic,
  // deleteGroupEpic,
  // toggleGroupMembershipEpic
];
