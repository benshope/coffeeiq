import { groupActions } from './actions';

const newTask = {
  name: '',
  location: ''
};

const newTasksState = {
  newTask,
  groupBeingEdited: undefined,
  filter: '',
  list: []
};

export function groupsReducer(state = {...newTasksState}, {payload, type}) {
  console.log('REDUCER: ', payload, type);
  if (type === groupActions.UPDATE_NEW_TASK) {
    return {
      ...state,
      newTask: { ...state.newTask, ...payload }
    };
  }
  if (type === groupActions.LOAD_TASKS_SUCCESS) {
    return {
      ...state,
      list: payload.groups
    };
  }
  if (type === groupActions.EDIT_TASK) {
    return {
      ...state,
      groupBeingEdited: payload
    };
  }
  if (type === groupActions.CREATE_TASK_SUCCESS) {
    const newState = {
      ...state,
      list: [...state.list, payload],
      newTask: {...newTask}
    };
    console.log('newState', newState);
    return newState;
  }
  if (type === groupActions.FILTER_TASKS) {
    return {
      ...state,
      filter: payload.filterType || ''
    };
  }
  if (type === groupActions.REMOVE_TASK_SUCCESS) {
    return {
      ...state,
      list: state.list.filter(group => {
        return group.key !== payload.key;
      })
    };
  }
  if (type === groupActions.UPDATE_TASK_SUCCESS) {
    return {
      ...state,
      list: state.list.map(group => {
        return group.key === payload.group.key ? payload.group : group;
      })
    };
  }
  return state;
}
