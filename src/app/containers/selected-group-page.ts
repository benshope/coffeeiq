import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as collection from '../actions/collection';
import { Group } from '../models/group';


@Component({
  selector: 'bc-selected-group-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-group-detail
      [group]="group$ | async"
      [inCollection]="isSelectedGroupInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-group-detail>
  `
})
export class SelectedGroupPageComponent {
  group$: Observable<Group>;
  isSelectedGroupInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.group$ = store.select(fromRoot.getSelectedGroup);
    this.isSelectedGroupInCollection$ = store.select(fromRoot.isSelectedGroupInCollection);
  }

  addToCollection(group: Group) {
    this.store.dispatch(new collection.AddGroupAction(group));
  }

  removeFromCollection(group: Group) {
    this.store.dispatch(new collection.RemoveGroupAction(group));
  }
}
