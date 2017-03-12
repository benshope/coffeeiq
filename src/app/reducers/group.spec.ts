import { reducer } from './groups';
import * as fromGroups from './groups';
import { SearchCompleteAction, LoadAction, SelectAction } from '../actions/group';
import { Group } from '../models/group';
import { LoadSuccessAction } from '../actions/collection';

describe('GroupsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromGroups.initialState);
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingGroups(action) {
      const group1 = {id: '111'} as Group;
      const group2 = {id: '222'} as Group;
      const createAction = new action([group1, group2]);

      const expectedResult = {
        ids: ['111', '222'],
        entities: {
          '111': group1,
          '222': group2
        },
        selectedGroupId: null,
      };

      const result = reducer(fromGroups.initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    function existingGroups(action) {
      const group1 = {id: '111'} as Group;
      const group2 = {id: '222'} as Group;
      const initialState = {
        ids: ['111', '222'],
        entities: {
          '111': group1,
          '222': group2
        },
        selectedGroupId: null,
      } as any;
      // should not replace existing groups
      const differentGroup2 = {id: '222', foo: 'bar'} as any;
      const group3 = {id: '333'} as Group;
      const createAction = new action([group3, differentGroup2]);

      const expectedResult = {
        ids: ['111', '222', '333'],
        entities: {
          '111': group1,
          '222': group2,
          '333': group3
        },
        selectedGroupId: null,
      };

      const result = reducer(initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    it('should add all groups in the payload when none exist', () => {
      noExistingGroups(SearchCompleteAction);
      noExistingGroups(LoadSuccessAction);
    });

    it('should add only new groups when groups already exist', () => {
      existingGroups(SearchCompleteAction);
      existingGroups(LoadSuccessAction);
    });
  });

  describe('LOAD', () => {
    it('should add a single group, if the group does not exist', () => {
      const group = {id: '888'} as Group;
      const action = new LoadAction(group);

      const expectedResult = {
        ids: ['888'],
        entities: {
          '888': group
        },
        selectedGroupId: null
      };

      const result = reducer(fromGroups.initialState, action);
      expect(result).toEqual(expectedResult);
    });

    it('should return the existing state if the group exists', () => {
      const initialState = {
        ids: ['999'],
        entities: {
          '999': {id: '999'}
        }
      } as any;
      const group = {id: '999', foo: 'baz'} as any;
      const action = new LoadAction(group);

      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('SELECT', () => {
    it('should set the selected group id on the state', () => {
      const action = new SelectAction('1');

      const result = reducer(fromGroups.initialState, action);
      expect(result.selectedGroupId).toBe('1');
    });
  });

  describe('Selections', () => {
    const group1 = {id: '111'} as Group;
    const group2 = {id: '222'} as Group;
    const state: fromGroups.State = {
      ids: ['111', '222'],
      entities: {
        '111': group1,
        '222': group2,
      },
      selectedGroupId: '111'
    };

    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromGroups.getEntities(state);
        expect(result).toBe(state.entities);
      });
    });

    describe('getIds', () => {
      it('should return ids', () => {
        const result = fromGroups.getIds(state);
        expect(result).toBe(state.ids);
      });
    });

    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = fromGroups.getSelectedId(state);
        expect(result).toBe('111');
      });
    });

    describe('getSelected', () => {
      it('should return the selected group', () => {
        const result = fromGroups.getSelected(state);
        expect(result).toBe(group1);
      });
    });

    describe('getAll', () => {
      it('should return all groups as an array ', () => {
        const result = fromGroups.getAll(state);
        expect(result).toEqual([group1, group2]);
      });
    });

  });
});
