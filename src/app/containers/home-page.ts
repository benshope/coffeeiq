import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';

@Component({
  selector: 'bc-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Welcome To CoffeeIQ</md-card-title>
      <md-card-content>
        <p>CoffeeIQ makes it easier for teammates to connect with one another through automatically-scheduled coffee breaks.</p>
      </md-card-content>
      <md-card-actions>
      <button md-raised-button color="primary" (click)="logIn()">Log In</button>
     </md-card-actions>
    </md-card>
  `
})
export class HomePageComponent {
  constructor(private store: Store<fromRoot.State>) {
  }

  logIn(admin?: boolean) {
    this.store.dispatch(new auth.LogInAction(admin));
  }
}
