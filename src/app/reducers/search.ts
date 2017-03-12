import * as group from '../actions/group';


export interface State {
  ids: string[];
  loading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  loading: false,
  query: ''
};

export function reducer(state = initialState, action: group.Actions): State {
  switch (action.type) {
    case group.ActionTypes.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case group.ActionTypes.SEARCH_COMPLETE: {
      const groups = action.payload;

      return {
        ids: groups.map(group => group.id),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
