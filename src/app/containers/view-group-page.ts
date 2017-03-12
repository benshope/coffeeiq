import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as group from '../actions/group';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Group Page's responsibility is to map router params
 * to a 'Select' group action. Actually showing the selected
 * group remains a responsibility of the
 * SelectedGroupPageComponent
 */
@Component({
  selector: 'bc-view-group-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-group-page></bc-selected-group-page>
  `
})
export class ViewGroupPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new group.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
