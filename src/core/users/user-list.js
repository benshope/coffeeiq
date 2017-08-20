import { FirebaseList } from "core/firebase";
import { userActions } from "./actions";

export const userList = new FirebaseList({
  onAdd: userActions.createUserSuccess,
  onChange: userActions.updateUserSuccess,
  onLoad: userActions.loadUsersSuccess,
  onRemove: userActions.removeUserSuccess
});
