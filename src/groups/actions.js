export const groupActions = {
  LOAD_GROUPS_SUCCESS: "LOAD_GROUPS_SUCCESS", // TODO: change 'load' to 'get'

  CREATE_GROUP: "CREATE_GROUP",
  CREATE_GROUP_FAILED: "CREATE_GROUP_FAILED",
  CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",

  DELETE_GROUP: "DELETE_GROUP", // TODO: change 'delete' to 'delete'
  DELETE_GROUP_FAILED: "DELETE_GROUP_FAILED",
  DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",

  UPDATE_GROUP: "UPDATE_GROUP",
  UPDATE_GROUP_FAILED: "UPDATE_GROUP_FAILED",
  UPDATE_GROUP_SUCCESS: "UPDATE_GROUP_SUCCESS",

  TOGGLE_GROUP_MEMBERSHIP: "TOGGLE_GROUP_MEMBERSHIP",

  getGroupsSuccess: groups => ({
    type: groupActions.LOAD_GROUPS_SUCCESS,
    payload: { groups }
  }),

  createGroup: group => ({
    type: groupActions.CREATE_GROUP,
    payload: group
  }),

  createGroupFailed: error => ({
    type: groupActions.CREATE_GROUP_FAILED,
    payload: { error }
  }),

  createGroupSuccess: group => ({
    type: groupActions.CREATE_GROUP_SUCCESS,
    payload: group
  }),

  deleteGroup: group => ({
    type: groupActions.DELETE_GROUP,
    payload: group
  }),

  deleteGroupFailed: error => ({
    type: groupActions.DELETE_GROUP_FAILED,
    payload: { error }
  }),

  deleteGroupSuccess: group => ({
    type: groupActions.DELETE_GROUP_SUCCESS,
    payload: group
  }),

  updateGroup: (group, changes) => ({
    type: groupActions.UPDATE_GROUP,
    payload: { group, changes }
  }),

  updateGroupFailed: error => ({
    type: groupActions.UPDATE_GROUP_FAILED,
    payload: { error }
  }),

  updateGroupSuccess: group => ({
    type: groupActions.UPDATE_GROUP_SUCCESS,
    payload: { group }
  }),

  toggleGroupMembership: group => ({
    type: groupActions.TOGGLE_GROUP_MEMBERSHIP,
    payload: group
  })
};
