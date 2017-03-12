import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GroupEffects } from './group';
import { GoogleGroupsService } from '../services/google-groups';
import { Observable } from 'rxjs/Observable';
import { SearchAction, SearchCompleteAction } from '../actions/group';
import { Group } from '../models/group';

describe('GroupEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      GroupEffects,
      {
        provide: GoogleGroupsService,
        useValue: jasmine.createSpyObj('googleGroupsService', ['searchGroups'])
      }
    ]
  }));

  function setup(params?: {searchGroupsReturnValue: any}) {
    const googleGroupsService = TestBed.get(GoogleGroupsService);
    if (params) {
      googleGroupsService.searchGroups.and.returnValue(params.searchGroupsReturnValue);
    }

    return {
      runner: TestBed.get(EffectsRunner),
      groupEffects: TestBed.get(GroupEffects)
    };
  }

  describe('search$', () => {
    it('should return a new group.SearchCompleteAction, with the groups, on success, after the de-bounce', fakeAsync(() => {
      const group1 = {id: '111', volumeInfo: {}} as Group;
      const group2 = {id: '222', volumeInfo: {}} as Group;
      const groups = [group1, group2];

      const {runner, groupEffects} = setup({searchGroupsReturnValue: Observable.of(groups)});

      const expectedResult = new SearchCompleteAction(groups);
      runner.queue(new SearchAction('query'));

      let result = null;
      groupEffects.search$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it('should return a new group.SearchCompleteAction, with an empty array, if the groups service throws', fakeAsync(() => {
      const {runner, groupEffects} = setup({searchGroupsReturnValue: Observable.throw(new Error())});

      const expectedResult = new SearchCompleteAction([]);
      runner.queue(new SearchAction('query'));

      let result = null;
      groupEffects.search$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it(`should not do anything if the query is an empty string`, fakeAsync(() => {
      const {runner, groupEffects} = setup();

      runner.queue(new SearchAction(''));
      let result = null;
      groupEffects.search$.subscribe({
        next: () => result = false,
        complete: () => result = false,
        error: () => result = false
      });

      tick(300);
      expect(result).toBe(null);
    }));

  });
});

