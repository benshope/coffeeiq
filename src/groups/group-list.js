import { groupActions } from "./actions";
import { FirebaseList } from "src/firebase";

export const groupList = new FirebaseList({
  onAdd: groupActions.createGroupSuccess,
  onChange: groupActions.updateGroupSuccess,
  onLoad: groupActions.loadGroupsSuccess,
  onRemove: groupActions.removeGroupSuccess
});
