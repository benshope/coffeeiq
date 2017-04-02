import { taskActions } from './actions';

export const newTasksState = {
  newTask: {
    name: '',
    location: ''
  },
  filter: '',
  list: []
};

export function tasksReducer(state = {...newTasksState}, {payload, type}) {
  // console.log('REDUCER: ', payload, type);
  switch (type) {
    case taskActions.UPDATE_NEW_TASK:
      return {
        ...state,
        newTask: { ...state.newTask, ...payload }
      };

    case taskActions.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        list: payload.tasks.reverse()
      };

    case taskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.unshift(payload.task)
      };

    case taskActions.FILTER_TASKS:
      return {
        ...state,
        filter: payload.filterType || ''
      };

    case taskActions.REMOVE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter(task => {
          return task.key !== payload.task.key;
        })
      };

    case taskActions.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.map(task => {
          return task.key === payload.task.key ? payload.task : task;
        })
      };

    default:
      return state;
  }
}
