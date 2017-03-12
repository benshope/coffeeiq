import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { Group } from '../models/group';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';

describe('CollectionEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CollectionEffects,
      {
        provide: Database,
        useValue: jasmine.createSpyObj('database', ['open', 'query', 'insert', 'executeWrite'])
      }
    ]
  }));

  function setup() {
    return {
      db: TestBed.get(Database),
      runner: TestBed.get(EffectsRunner),
      collectionEffects: TestBed.get(CollectionEffects)
    };
  }

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      const {db, collectionEffects} = setup();
      collectionEffects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('groups_app');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccessAction, with the groups, on success', () => {
      const group1 = {id: '111', volumeInfo: {}} as Group;
      const group2 = {id: '222', volumeInfo: {}} as Group;

      const {db, runner, collectionEffects} = setup();

      const groupsObservable = Observable.of(group1, group2);
      db.query.and.returnValue(groupsObservable);

      const expectedResult = new collection.LoadSuccessAction([group1, group2]);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('should return a collection.LoadFailAction, if the query throws', () => {
      const {db, runner, collectionEffects} = setup();

      const error = new Error('msg');
      db.query.and.returnValue(Observable.throw(error));

      const expectedResult = new collection.LoadFailAction(error);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('addGroupToCollection$', () => {
    it('should return a collection.AddGroupSuccessAction, with the group, on success', () => {
      const group = {id: '111', volumeInfo: {}} as Group;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.of({}));

      const expectedResult = new collection.AddGroupSuccessAction(group);

      runner.queue(new collection.AddGroupAction(group));

      collectionEffects.addGroupToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('groups', [group]);
      });
    });

    it('should return a collection.AddGroupFailAction, with the group, when the db insert throws', () => {
      const group = {id: '111', volumeInfo: {}} as Group;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.throw(new Error()));

      const expectedResult = new collection.AddGroupFailAction(group);

      runner.queue(new collection.AddGroupAction(group));

      collectionEffects.addGroupToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('groups', [group]);
      });
    });

    describe('removeGroupFromCollection$', () => {
      it('should return a collection.RemoveGroupSuccessAction, with the group, on success', () => {
        const group = {id: '111', volumeInfo: {}} as Group;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.of({}));

        const expectedResult = new collection.RemoveGroupSuccessAction(group);

        runner.queue(new collection.RemoveGroupAction(group));

        collectionEffects.removeGroupFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('groups', 'delete', ['111']);
        });
      });

      it('should return a collection.RemoveGroupFailAction, with the group, when the db insert throws', () => {
        const group = {id: '111', volumeInfo: {}} as Group;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.throw(new Error()));

        const expectedResult = new collection.RemoveGroupFailAction(group);

        runner.queue(new collection.RemoveGroupAction(group));

        collectionEffects.removeGroupFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('groups', 'delete', ['111']);
        });
      });
    });
  });
});
