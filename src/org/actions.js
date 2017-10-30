const action = type => payload => ({ type, payload });

export const orgActionTypes = {
  ON_ORG_VALUE: "ON_ORG_VALUE",
  ON_ORG_CHILD_ADDED: "ON_ORG_CHILD_ADDED",
  ON_ORG_CHILD_CHANGED: "ON_ORG_CHILD_CHANGED",
  ON_ORG_CHILD_REMOVED: "ON_ORG_CHILD_REMOVED",

  CREATE_INVITE: "CREATE_INVITE",
  CREATE_INVITE_FAILED: "CREATE_INVITE_FAILED",
  CREATE_INVITE_SUCCESS: "CREATE_INVITE_SUCCESS",

  DELETE_INVITE: "DELETE_INVITE",
  DELETE_INVITE_FAILED: "DELETE_INVITE_FAILED",
  DELETE_INVITE_SUCCESS: "DELETE_INVITE_SUCCESS",

  RESEND_INVITE: "RESEND_INVITE",
  RESEND_INVITE_FAILED: "RESEND_INVITE_FAILED",
  RESEND_INVITE_SUCCESS: "RESEND_INVITE_SUCCESS",

  CREATE_GROUP: "CREATE_GROUP",
  CREATE_GROUP_FAILED: "CREATE_GROUP_FAILED",
  CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",

  DELETE_GROUP: "DELETE_GROUP",
  DELETE_GROUP_FAILED: "DELETE_GROUP_FAILED",
  DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",

  UPDATE_CALENDAR_ACCESS: "UPDATE_CALENDAR_ACCESS",
  UPDATE_CALENDAR_ACCESS_FAILED: "UPDATE_CALENDAR_ACCESS_FAILED",
  UPDATE_CALENDAR_ACCESS_SUCCESS: "UPDATE_CALENDAR_ACCESS_SUCCESS",

  UPDATE_GROUP: "UPDATE_GROUP",
  UPDATE_GROUP_FAILED: "UPDATE_GROUP_FAILED",
  UPDATE_GROUP_SUCCESS: "UPDATE_GROUP_SUCCESS",

  TOGGLE_GROUP_MEMBERSHIP: "TOGGLE_GROUP_MEMBERSHIP",
  TOGGLE_GROUP_MEMBERSHIP_FAILED: "TOGGLE_GROUP_MEMBERSHIP_FAILED",
  TOGGLE_GROUP_MEMBERSHIP_SUCCESS: "TOGGLE_GROUP_MEMBERSHIP_SUCCESS"
};

export const orgActions = {
  ...orgActionTypes,
  onValue: action(orgActionTypes.ON_ORG_VALUE),
  onChildAdded: action(orgActionTypes.ON_ORG_CHILD_ADDED),
  onChildChanged: action(orgActionTypes.ON_ORG_CHILD_CHANGED),
  onChildRemoved: action(orgActionTypes.ON_ORG_CHILD_REMOVED),
  createGroup: action(orgActionTypes.CREATE_GROUP),
  createGroupFailed: action(orgActionTypes.CREATE_GROUP_FAILED),
  createGroupSuccess: action(orgActionTypes.CREATE_GROUP_SUCCESS),
  createInvite: action(orgActionTypes.CREATE_INVITE),
  createInviteFailed: action(orgActionTypes.CREATE_INVITE_FAILED),
  createInviteSuccess: action(orgActionTypes.CREATE_INVITE_SUCCESS),
  deleteInvite: action(orgActionTypes.DELETE_INVITE),
  deleteInviteFailed: action(orgActionTypes.DELETE_INVITE_FAILED),
  deleteInviteSuccess: action(orgActionTypes.DELETE_INVITE_SUCCESS),
  resendInvite: action(orgActionTypes.RESEND_INVITE),
  resendInviteFailed: action(orgActionTypes.RESEND_INVITE_FAILED),
  resendInviteSuccess: action(orgActionTypes.RESEND_INVITE_SUCCESS),
  deleteGroup: action(orgActionTypes.DELETE_GROUP),
  deleteGroupFailed: action(orgActionTypes.DELETE_GROUP_FAILED),
  deleteGroupSuccess: action(orgActionTypes.DELETE_GROUP_SUCCESS),
  updateGroup: action(orgActionTypes.UPDATE_GROUP),
  updateGroupFailed: action(orgActionTypes.UPDATE_GROUP_FAILED),
  updateGroupSuccess: action(orgActionTypes.UPDATE_GROUP_SUCCESS),
  updateCalendarAccess: action(orgActionTypes.UPDATE_CALENDAR_ACCESS),
  updateCalendarAccessFailed: action(
    orgActionTypes.UPDATE_CALENDAR_ACCESS_FAILED
  ),
  updateCalendarAccessSuccess: action(
    orgActionTypes.UPDATE_CALENDAR_ACCESS_SUCCESS
  ),
  toggleMembership: action(orgActionTypes.TOGGLE_GROUP_MEMBERSHIP),
  toggleMembershipSuccess: action(
    orgActionTypes.TOGGLE_GROUP_MEMBERSHIP_SUCCESS
  ),
  toggleMembershipFailed: action(orgActionTypes.TOGGLE_GROUP_MEMBERSHIP_FAILED)
};

export default orgActions;
