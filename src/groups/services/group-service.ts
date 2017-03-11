import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../../auth';
import { IGroup, Group } from '../models/group';
import {
  IMember,
  Member
} from '../models/member';

import { Http, Headers } from '@angular/http';
import { Inject } from '@angular/core';

@Injectable()
export class GroupService {
  visibleGroups$: Observable<IGroup[]>;

  private filter$: ReplaySubject<any> = new ReplaySubject(1);
  private filteredGroups$: FirebaseListObservable<IGroup[]>;
  private groups$: FirebaseListObservable<IGroup[]>;
  public members$: FirebaseListObservable<IMember[]>;

  constructor(
    af: AngularFire,
    auth: AuthService,
    @Inject(Http) private http: Http
  ) {
    const email = auth.authState.google.email;
    const org = email.split('@')[1].replace('.', '_');
    const groupPath = `orgs/${org}/groups`;

    this.members$ = af.database.list(`orgs/${org}/members`);
    console.log('auth', auth);
    this.members$.update(auth.id, new Member(
      auth.authState.google.email,
      auth.authState.google.displayName));
    this.groups$ = af.database.list(groupPath);
    this.filteredGroups$ = af.database.list(groupPath, {query: {
      orderByChild: 'completed',
      equalTo: this.filter$
    }});

    this.visibleGroups$ = this.filter$
      .switchMap(filter => filter === null ?
        this.groups$ : this.filteredGroups$);
  }

  filterGroups(filter: string): void {
    switch (filter) {
      case 'false':
        this.filter$.next(false);
        break;

      case 'true':
        this.filter$.next(true);
        break;

      default:
        this.filter$.next(null);
        break;
    }
  }

  createGroup(props: any): firebase.Promise<any> {
    return this.groups$.push(
      new Group(props.name, props.location));
  }

  removeGroup(group: IGroup): firebase.Promise<any> {
    return this.groups$.remove(group.$key);
  }

  updateGroup(group: IGroup, changes: any): firebase.Promise<any> {
    return this.groups$.update(group.$key, changes);
  }

  sendCalendarInvites = () => {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem('accessToken'));
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://www.googleapis.com/calendar/v3' +
        '/calendars/primary/events?sendNotifications=true',
      {
        attachments: [],
        location: 'The bedroom of Lexis',
        summary: 'Martin Luther King, Jr. Day',
        description: 'An important civil rights holiday',
        attendees: [
          {email: 'nimajnebs@gmail.com'},
          {email: 'lexishanson@gmail.com'}
        ],
        reminders: {
          useDefault: true
        },
        start: {
          dateTime: '2017-02-27T08:00:00-07:00'
        },
        end: {
          dateTime: '2017-02-27T08:00:00-08:00'
        }
      },
      { headers: headers })
        .map(response => response.json())
        .subscribe(console.log, console.error);
  };
}
