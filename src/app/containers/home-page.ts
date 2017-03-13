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
    <button (click)="logIn()">Log In</button>
    <span class="gotham">Gotham</span>
  `
})
export class HomePageComponent {

  constructor(private store: Store<fromRoot.State>) {
  }

  logIn() {
    console.log('logIn');
    this.store.dispatch(new auth.LogInAction());
  }
}
