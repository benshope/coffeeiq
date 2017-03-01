import { Injectable } from '@angular/core';
import {
  AuthProviders,
  FirebaseAuth,
  FirebaseAuthState
  // FirebaseListObservable
} from 'angularfire2';

@Injectable()
export class AuthService {
  public authState: FirebaseAuthState = null;
  // private org$: FirebaseListObservable<any[]>;

  constructor(
    public auth$: FirebaseAuth
  ) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      // const email = state.google.email;
      // const org = email.split('@')[1].replace('.', '_');
      // const orgPath = `/orgs/${org}`;
      // this.org$ = angularFire.database.list(orgPath);
      // // this.org$.push(email);
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({provider, scope: [
        'https://www.googleapis.com/auth/calendar'
      ]})
      .then((x: any) => {
        console.log('authorized', x);
        localStorage.setItem('accessToken', x.google.accessToken);
      })
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  signOut(): void {
    this.auth$.logout();
  }
}
