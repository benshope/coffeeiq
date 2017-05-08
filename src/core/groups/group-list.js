import { FirebaseList } from 'core/firebase';
import { groupActions } from './actions';
import { Task } from './group';

export const groupList = new FirebaseList({
  onAdd: groupActions.createTaskSuccess,
  onChange: groupActions.updateTaskSuccess,
  onLoad: groupActions.loadTasksSuccess,
  onRemove: groupActions.removeTaskSuccess
}, Task);
