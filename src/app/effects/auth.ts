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
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  logIn$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOG_IN)
    .map((action: auth.LogInAction) => {
      const admin = action.payload;
      return fromPromise(<Promise<any>>this.angularFire.auth.login({
        provider: AuthProviders.Google,
        scope: admin ? [ 'https://www.googleapis.com/auth/calendar' ] : []
      })
        .then(
          (state: any) => new auth.LogInSuccessAction(
            <string>state.google.accessToken),
          () => new auth.LogInFailAction()
        ));
    }).mergeMap(x => x);

  @Effect()
  logOut$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOG_OUT)
    .map(() => {
      return fromPromise(<Promise<any>>this.angularFire.auth.logout()
        .then(
          () => new auth.LogOutSuccessAction(),
          () => new auth.LogOutFailAction()
        ));
    }).mergeMap(x => x);

  @Effect()
  logInSuccess$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOG_IN_SUCCESS)
    .map(() => {
      return go(['/path', { routeParam: 1 }], { query: 'string' });
    });

  constructor(
    private actions$: Actions,
    private angularFire: AngularFire
  ) {}
}
