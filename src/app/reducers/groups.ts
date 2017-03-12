import { createSelector } from 'reselect';
import { Group } from '../models/group';
import * as group from '../actions/group';
import * as collection from '../actions/collection';


export interface State {
  ids: string[];
  entities: { [id: string]: Group };
  selectedGroupId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedGroupId: null,
};

export function reducer(state = initialState, action: group.Actions | collection.Actions): State {
  switch (action.type) {
    case group.ActionTypes.SEARCH_COMPLETE:
    case collection.ActionTypes.LOAD_SUCCESS: {
      const groups = action.payload;
      const newGroups = groups.filter(group => !state.entities[group.id]);

      const newGroupIds = newGroups.map(group => group.id);
      const newGroupEntities = newGroups.reduce((entities: { [id: string]: Group }, group: Group) => {
        return Object.assign(entities, {
          [group.id]: group
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newGroupIds ],
        entities: Object.assign({}, state.entities, newGroupEntities),
        selectedGroupId: state.selectedGroupId
      };
    }

    case group.ActionTypes.LOAD: {
      const group = action.payload;

      if (state.ids.indexOf(group.id) > -1) {
        return state;
      }

      return {
        ids: [ ...state.ids, group.id ],
        entities: Object.assign({}, state.entities, {
          [group.id]: group
        }),
        selectedGroupId: state.selectedGroupId
      };
    }

    case group.ActionTypes.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedGroupId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedGroupId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
