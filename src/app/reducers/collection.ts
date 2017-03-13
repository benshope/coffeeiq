import * as collection from '../actions/collection';


export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collection.ActionTypes.LOAD_SUCCESS: {
      const groups = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: groups.map((group: any) => group.id)
      };
    }

    case collection.ActionTypes.ADD_GROUP_SUCCESS:
    case collection.ActionTypes.REMOVE_GROUP_FAIL: {
      const group = action.payload;

      if (state.ids.indexOf(group.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, group.id ]
      });
    }

    case collection.ActionTypes.REMOVE_GROUP_SUCCESS:
    case collection.ActionTypes.ADD_GROUP_FAIL: {
      const group = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== group.id)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
