
export const groupActions = {
  UPDATE_NEW_GROUP: 'UPDATE_NEW_GROUP',

  CREATE_GROUP: 'CREATE_GROUP',
  CREATE_GROUP_FAILED: 'CREATE_GROUP_FAILED',
  CREATE_GROUP_SUCCESS: 'CREATE_GROUP_SUCCESS',

  REMOVE_GROUP: 'REMOVE_GROUP',
  REMOVE_GROUP_FAILED: 'REMOVE_GROUP_FAILED',
  REMOVE_GROUP_SUCCESS: 'REMOVE_GROUP_SUCCESS',

  EDIT_GROUP: 'EDIT_GROUP',

  TOGGLE_GROUP_MEMBERSHIP: 'TOGGLE_GROUP_MEMBERSHIP',

  UPDATE_GROUP: 'UPDATE_GROUP',
  UPDATE_GROUP_FAILED: 'UPDATE_GROUP_FAILED',
  UPDATE_GROUP_SUCCESS: 'UPDATE_GROUP_SUCCESS',

  FILTER_GROUPS: 'FILTER_GROUPS',
  LOAD_GROUPS_SUCCESS: 'LOAD_GROUPS_SUCCESS',

  editGroup: group => ({
    type: groupActions.EDIT_GROUP,
    payload: group
  }),

  updateNewGroup: (group) => ({
    type: groupActions.UPDATE_NEW_GROUP,
    payload: group
  }),

  createGroup: (group) => ({
    type: groupActions.CREATE_GROUP,
    payload: group
  }),

  createGroupFailed: error => ({
    type: groupActions.CREATE_GROUP_FAILED,
    payload: {error}
  }),

  createGroupSuccess: group => ({
    type: groupActions.CREATE_GROUP_SUCCESS,
    payload: group
  }),

  removeGroup: group => ({
    type: groupActions.REMOVE_GROUP,
    payload: group
  }),

  removeGroupFailed: error => ({
    type: groupActions.REMOVE_GROUP_FAILED,
    payload: {error}
  }),

  removeGroupSuccess: group => ({
    type: groupActions.REMOVE_GROUP_SUCCESS,
    payload: group
  }),

  toggleGroupMembership: (group) => ({
    type: groupActions.TOGGLE_GROUP_MEMBERSHIP,
    payload: group
  }),

  updateGroup: (group, changes) => ({
    type: groupActions.UPDATE_GROUP,
    payload: {group, changes}
  }),

  updateGroupFailed: error => ({
    type: groupActions.UPDATE_GROUP_FAILED,
    payload: {error}
  }),

  updateGroupSuccess: group => ({
    type: groupActions.UPDATE_GROUP_SUCCESS,
    payload: {group}
  }),

  filterGroups: filterType => ({
    type: groupActions.FILTER_GROUPS,
    payload: {filterType}
  }),

  loadGroupsSuccess: groups => ({
    type: groupActions.LOAD_GROUPS_SUCCESS,
    payload: {groups}
  })
};
