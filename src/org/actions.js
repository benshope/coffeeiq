const action = type => payload => ({ type, payload });

export const orgActionTypes = {
  ORG_VALUE: "ORG_VALUE",
  ORG_CHILD_ADDED: "ORG_CHILD_ADDED",
  ORG_CHILD_CHANGED: "ORG_CHILD_CHANGED",
  ORG_CHILD_REMOVED: "ORG_CHILD_REMOVED",

  CREATE_GROUP: "CREATE_GROUP",
  CREATE_GROUP_FAILED: "CREATE_GROUP_FAILED",
  CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",

  DELETE_GROUP: "DELETE_GROUP",
  DELETE_GROUP_FAILED: "DELETE_GROUP_FAILED",
  DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",

  UPDATE_GROUP: "UPDATE_GROUP",
  UPDATE_GROUP_FAILED: "UPDATE_GROUP_FAILED",
  UPDATE_GROUP_SUCCESS: "UPDATE_GROUP_SUCCESS",

  TOGGLE_GROUP_MEMBERSHIP: "TOGGLE_GROUP_MEMBERSHIP"
};

// what should go in the place of the action function?
export const orgActions = {
  value: action(orgActionTypes.ORG_VALUE),
  childAdded: action(orgActionTypes.ORG_CHILD_ADDED),
  childChanged: action(orgActionTypes.ORG_CHILD_CHANGED),
  childRemoved: action(orgActionTypes.ORG_CHILD_REMOVED),
  createGroup: action(orgActionTypes.CREATE_GROUP),
  createGroupFailed: action(orgActionTypes.CREATE_GROUP_FAILED),
  createGroupSuccess: action(orgActionTypes.CREATE_GROUP_SUCCESS),
  deleteGroup: action(orgActionTypes.DELETE_GROUP),
  deleteGroupFailed: action(orgActionTypes.DELETE_GROUP_FAILED),
  deleteGroupSuccess: action(orgActionTypes.DELETE_GROUP_SUCCESS),
  updateGroup: action(orgActionTypes.UPDATE_GROUP),
  updateGroupFailed: action(orgActionTypes.UPDATE_GROUP_FAILED),
  updateGroupSuccess: action(orgActionTypes.UPDATE_GROUP_SUCCESS),
  toggleGroupMembership: action(orgActionTypes.TOGGLE_GROUP_MEMBERSHIP)
};

export default orgActions;
