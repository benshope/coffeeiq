export const taskActions = {
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

  editTask: task => ({
    type: taskActions.EDIT_TASK,
    payload: task
  }),

  updateNewTask: (task) => ({
    type: taskActions.UPDATE_NEW_TASK,
    payload: task
  }),

  createTask: (task) => ({
    type: taskActions.CREATE_TASK,
    payload: task
  }),

  createTaskFailed: error => ({
    type: taskActions.CREATE_TASK_FAILED,
    payload: {error}
  }),

  createTaskSuccess: task => ({
    type: taskActions.CREATE_TASK_SUCCESS,
    payload: task
  }),

  removeTask: task => ({
    type: taskActions.REMOVE_TASK,
    payload: task
  }),

  removeTaskFailed: error => ({
    type: taskActions.REMOVE_TASK_FAILED,
    payload: {error}
  }),

  removeTaskSuccess: task => ({
    type: taskActions.REMOVE_TASK_SUCCESS,
    payload: task
  }),

  toggleGroupMembership: (group) => ({
    type: taskActions.TOGGLE_GROUP_MEMBERSHIP,
    payload: group
  }),

  updateTask: (task, changes) => ({
    type: taskActions.UPDATE_TASK,
    payload: {task, changes}
  }),

  updateTaskFailed: error => ({
    type: taskActions.UPDATE_TASK_FAILED,
    payload: {error}
  }),

  updateTaskSuccess: task => ({
    type: taskActions.UPDATE_TASK_SUCCESS,
    payload: {task}
  }),

  filterTasks: filterType => ({
    type: taskActions.FILTER_TASKS,
    payload: {filterType}
  }),

  loadTasksSuccess: tasks => ({
    type: taskActions.LOAD_TASKS_SUCCESS,
    payload: {tasks}
  })
};
