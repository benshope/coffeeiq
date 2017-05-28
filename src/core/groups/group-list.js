import { FirebaseList } from 'core/firebase';
import { groupActions } from './actions';

export const groupList = new FirebaseList({
  onAdd: groupActions.createGroupSuccess,
  onChange: groupActions.updateGroupSuccess,
  onLoad: groupActions.loadGroupsSuccess,
  onRemove: groupActions.removeGroupSuccess
});
