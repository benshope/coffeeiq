import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    private angularFire: AngularFire,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.angularFire.auth
      .take(1)
      .map(authState => !authState)
      .do(unauthenticated => {
        if (!unauthenticated) {
          this.router.navigate(['/groups']);
        }
      });
  }
}
