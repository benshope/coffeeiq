export const taskActions = {
  UPDATE_NEW_TASK: 'UPDATE_NEW_TASK',

  CREATE_TASK: 'CREATE_TASK',
  CREATE_TASK_FAILED: 'CREATE_TASK_FAILED',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',

  REMOVE_TASK: 'REMOVE_TASK',
  REMOVE_TASK_FAILED: 'REMOVE_TASK_FAILED',
  REMOVE_TASK_SUCCESS: 'REMOVE_TASK_SUCCESS',

  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_FAILED: 'UPDATE_TASK_FAILED',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',

  FILTER_TASKS: 'FILTER_TASKS',
  LOAD_TASKS_SUCCESS: 'LOAD_TASKS_SUCCESS',

  updateNewTask: task => ({
    type: taskActions.UPDATE_NEW_TASK,
    payload: task
  }),

  createTask: title => ({
    type: taskActions.CREATE_TASK,
    payload: {task: {title, completed: false}}
  }),

  createTaskFailed: error => ({
    type: taskActions.CREATE_TASK_FAILED,
    payload: {error}
  }),

  createTaskSuccess: task => ({
    type: taskActions.CREATE_TASK_SUCCESS,
    payload: {task}
  }),

  removeTask: task => ({
    type: taskActions.REMOVE_TASK,
    payload: {task}
  }),

  removeTaskFailed: error => ({
    type: taskActions.REMOVE_TASK_FAILED,
    payload: {error}
  }),

  removeTaskSuccess: task => ({
    type: taskActions.REMOVE_TASK_SUCCESS,
    payload: {task}
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
