import { taskActions } from './actions';

const newTask = {
  name: '',
  location: ''
};

const newTasksState = {
  newTask,
  taskBeingEdited: undefined,
  filter: '',
  list: []
};

export function tasksReducer(state = {...newTasksState}, {payload, type}) {
  console.log('REDUCER: ', payload, type);
  if (type === taskActions.UPDATE_NEW_TASK) {
    return {
      ...state,
      newTask: { ...state.newTask, ...payload }
    };
  }
  if (type === taskActions.LOAD_TASKS_SUCCESS) {
    return {
      ...state,
      list: payload.tasks
    };
  }
  if (type === taskActions.EDIT_TASK) {
    return {
      ...state,
      taskBeingEdited: payload
    };
  }
  if (type === taskActions.CREATE_TASK_SUCCESS) {
    const newState = {
      ...state,
      list: [...state.list, payload],
      newTask: {...newTask}
    };
    console.log('newState', newState);
    return newState;
  }
  if (type === taskActions.FILTER_TASKS) {
    return {
      ...state,
      filter: payload.filterType || ''
    };
  }
  if (type === taskActions.REMOVE_TASK_SUCCESS) {
    return {
      ...state,
      list: state.list.filter(task => {
        return task.key !== payload.key;
      })
    };
  }
  if (type === taskActions.UPDATE_TASK_SUCCESS) {
    return {
      ...state,
      list: state.list.map(task => {
        return task.key === payload.task.key ? payload.task : task;
      })
    };
  }
  return state;
}
