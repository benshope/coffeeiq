import { groupActions } from './actions';

const newGroup = {
  name: '',
  location: ''
};

const newGroupsState = {
  newGroup,
  groupBeingEdited: undefined,
  filter: '',
  list: []
};

export function groupsReducer(state = {...newGroupsState}, {payload, type}) {
  console.log('REDUCER: ', payload, type);
  if (type === groupActions.UPDATE_NEW_GROUP) {
    return {
      ...state,
      newGroup: { ...state.newGroup, ...payload }
    };
  }
  if (type === groupActions.LOAD_GROUPS_SUCCESS) {
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
      list: [...state.list, payload],
      newGroup: {...newGroup}
    };
    console.log('newState', newState);
    return newState;
  }
  if (type === groupActions.FILTER_GROUPS) {
    return {
      ...state,
      filter: payload.filterType || ''
    };
  }
  if (type === groupActions.REMOVE_GROUP_SUCCESS) {
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
  return state;
}
