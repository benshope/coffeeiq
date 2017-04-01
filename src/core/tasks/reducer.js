import { List, Record } from 'immutable';
import { taskActions } from './actions';


export const TasksState = new Record({
  newTask: {
    name: '',
    location: ''
  },
  filter: '',
  list: new List()
});

export function tasksReducer(state = new TasksState(), {payload, type}) {
  console.log('REDUCER: ', payload, type);
  switch (type) {
    case taskActions.UPDATE_NEW_TASK:
      return state.set('newTask', { ...state.newTask, ...payload });

    case taskActions.LOAD_TASKS_SUCCESS:
      return state.set('list', new List(payload.tasks.reverse()));

    case taskActions.CREATE_TASK_SUCCESS:
      return state.set('list', state.list.unshift(payload.task));

    case taskActions.FILTER_TASKS:
      return state.set('filter', payload.filterType || '');

    case taskActions.REMOVE_TASK_SUCCESS:
      return state.set('list', state.list.filter(task => {
        return task.key !== payload.task.key;
      }));

    case taskActions.UPDATE_TASK_SUCCESS:
      return state.set('list', state.list.map(task => {
        return task.key === payload.task.key ? payload.task : task;
      }));

    default:
      return state;
  }
}
