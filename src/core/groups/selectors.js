import { createSelector } from 'reselect';


export function getTasks(state) {
  return state.groups;
}

export function getTaskFilter(state) {
  return getTasks(state).filter;
}

export function getTaskList(state) {
  return getTasks(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleTasks = createSelector(
  getTaskFilter,
  getTaskList,
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
