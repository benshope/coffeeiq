import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as group from '../actions/group';
import { Group } from '../models/group';


@Component({
  selector: 'bc-find-group-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-group-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      (search)="search($event)"
    >
    </bc-group-search>
    <bc-group-preview-list
      [groups]="groups$ | async"
    >
    </bc-group-preview-list>
  `
})
export class FindGroupPageComponent {
  searchQuery$: Observable<string>;
  groups$: Observable<Group[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).take(1);
    this.groups$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new group.SearchAction(query));
  }
}
