import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as layout from '../actions/layout';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <bc-toolbar>
        CoffeeIQ
        <button
          md-raised-button
          color="primary"
          (click)="logOut()"
        >
          Log Out
        </button>
      </bc-toolbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.loggedIn$ = this.store.select(fromRoot.getLoggedIn);
  }

  logOut() {
    this.store.dispatch(new auth.LogOutAction());
  }
}
