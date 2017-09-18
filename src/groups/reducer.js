import { groupActions } from "./actions";
import { authActions } from "../auth/actions";

const newGroupsState = {
  list: []
};

// TODO: use an object with functions as a case switch
export function groupsReducer(
  state = { ...newGroupsState },
  { payload, type }
) {
  // console.log("ACTION", type, payload);
  if (type === groupActions.GET_GROUPS_SUCCESS) {
    return {
      ...state,
      list: payload.groups
    };
  }
  if (type === groupActions.EDIT_GROUP) {
    return {
      ...state,
      groupBeingEdited: payload
    };
  }
  if (type === groupActions.CREATE_GROUP_SUCCESS) {
    const newState = {
      ...state,
      list: [...state.list, payload]
    };
    return newState;
  }
  if (type === groupActions.FILTER_GROUPS) {
    return {
      ...state,
      filter: payload.filterType || ""
    };
  }
  if (type === groupActions.DELETE_GROUP_SUCCESS) {
    return {
      ...state,
      list: state.list.filter(group => {
        return group.key !== payload.key;
      })
    };
  }
  if (type === groupActions.UPDATE_GROUP_SUCCESS) {
    return {
      ...state,
      list: state.list.map(group => {
        return group.key === payload.group.key ? payload.group : group;
      })
    };
  }
  if (type === authActions.SIGN_OUT_SUCCESS) {
    return { ...newGroupsState };
  }
  return state;
}
