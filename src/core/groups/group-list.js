import { FirebaseList } from 'core/firebase';
import { groupActions } from './actions';
import { Group } from './group';

export const groupList = new FirebaseList({
  onAdd: groupActions.createGroupSuccess,
  onChange: groupActions.updateGroupSuccess,
  onLoad: groupActions.loadGroupsSuccess,
  onRemove: groupActions.removeGroupSuccess
}, Group);
