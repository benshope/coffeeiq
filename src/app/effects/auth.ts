import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import {
  AuthProviders,
  AngularFire,
  FirebaseAuthState
} from 'angularfire2';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  logIn$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOG_IN)
    .map(() => {
      return fromPromise(<Promise<any>>this.angularFire.auth.login({
          provider: AuthProviders.Google,
          scope: [ 'https://www.googleapis.com/auth/calendar' ]
        }));
    })
    .mergeMap(x => x)
    .mergeMap((state: any) => {
      localStorage.setItem('accessToken', state.google.accessToken);
      return of(new auth.LogInSuccessAction()); // TODO: set this state
    })
    .catch(() => of(new auth.LogInFailAction()));

  @Effect()
  logOut$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOG_OUT)
    .map(() => {
      return fromPromise(<Promise<any>>this.angularFire.auth.logout());
    })
    .mergeMap(x => x)
    .mergeMap((state: any) => {
      localStorage.removeItem('accessToken');
      return of(new auth.LogOutSuccessAction()); // TODO: set this state
    })
    .catch(() => of(new auth.LogOutFailAction()));

  constructor(
    private actions$: Actions,
    private angularFire: AngularFire
  ) {}
}
