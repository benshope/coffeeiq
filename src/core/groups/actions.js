export const groupActions = {
  UPDATE_NEW_TASK: 'UPDATE_NEW_TASK',

  CREATE_TASK: 'CREATE_TASK',
  CREATE_TASK_FAILED: 'CREATE_TASK_FAILED',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',

  REMOVE_TASK: 'REMOVE_TASK',
  REMOVE_TASK_FAILED: 'REMOVE_TASK_FAILED',
  REMOVE_TASK_SUCCESS: 'REMOVE_TASK_SUCCESS',

  EDIT_TASK: 'EDIT_TASK',

  TOGGLE_GROUP_MEMBERSHIP: 'TOGGLE_GROUP_MEMBERSHIP',

  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_FAILED: 'UPDATE_TASK_FAILED',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',

  FILTER_TASKS: 'FILTER_TASKS',
  LOAD_TASKS_SUCCESS: 'LOAD_TASKS_SUCCESS',

  editTask: group => ({
    type: groupActions.EDIT_TASK,
    payload: group
  }),

  updateNewTask: (group) => ({
    type: groupActions.UPDATE_NEW_TASK,
    payload: group
  }),

  createTask: (group) => ({
    type: groupActions.CREATE_TASK,
    payload: group
  }),

  createTaskFailed: error => ({
    type: groupActions.CREATE_TASK_FAILED,
    payload: {error}
  }),

  createTaskSuccess: group => ({
    type: groupActions.CREATE_TASK_SUCCESS,
    payload: group
  }),

  removeTask: group => ({
    type: groupActions.REMOVE_TASK,
    payload: group
  }),

  removeTaskFailed: error => ({
    type: groupActions.REMOVE_TASK_FAILED,
    payload: {error}
  }),

  removeTaskSuccess: group => ({
    type: groupActions.REMOVE_TASK_SUCCESS,
    payload: group
  }),

  toggleGroupMembership: (group) => ({
    type: groupActions.TOGGLE_GROUP_MEMBERSHIP,
    payload: group
  }),

  updateTask: (group, changes) => ({
    type: groupActions.UPDATE_TASK,
    payload: {group, changes}
  }),

  updateTaskFailed: error => ({
    type: groupActions.UPDATE_TASK_FAILED,
    payload: {error}
  }),

  updateTaskSuccess: group => ({
    type: groupActions.UPDATE_TASK_SUCCESS,
    payload: {group}
  }),

  filterTasks: filterType => ({
    type: groupActions.FILTER_TASKS,
    payload: {filterType}
  }),

  loadTasksSuccess: groups => ({
    type: groupActions.LOAD_TASKS_SUCCESS,
    payload: {groups}
  })
};
