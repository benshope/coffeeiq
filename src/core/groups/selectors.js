import { createSelector } from 'reselect';


export function getGroups(state) {
  return state.groups;
}

export function getGroupFilter(state) {
  return getGroups(state).filter;
}

export function getGroupList(state) {
  return getGroups(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleGroups = createSelector(
  getGroupFilter,
  getGroupList,
  (filter, groupList) => {
    switch (filter) {
      case 'active':
        return groupList.filter(group => !group.completed);

      case 'completed':
        return groupList.filter(group => group.completed);

      default:
        return groupList;
    }
  }
);
