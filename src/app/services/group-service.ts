import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Http, Headers } from '@angular/http';
import { Inject } from '@angular/core';

import {
  IGroup,
  Group
} from '../models/group';
import {
  IMember,
  Member
} from '../models/member';

@Injectable()
export class GroupService {
  visibleGroups$: Observable<IGroup[]>;

  private filter$: ReplaySubject<any> = new ReplaySubject(1);
  private filteredGroups$: FirebaseListObservable<IGroup[]>;
  private groups$: FirebaseListObservable<IGroup[]>;
  public members$: FirebaseListObservable<IMember[]>;

  constructor(
    angularFire: AngularFire,
    @Inject(Http) private http: Http
  ) {
    angularFire.auth.subscribe((authState) => {
      if (authState.uid) {
        const email = authState.google.email;
        const org = email.split('@')[1].replace('.', '_');
        const groupPath = `orgs/${org}/groups`;

        this.members$ = angularFire.database.list(`orgs/${org}/members`);

        this.members$.update(authState.uid, new Member(
          authState.google.email,
          authState.google.displayName));

        this.groups$ = angularFire.database.list(groupPath);
        this.filteredGroups$ = angularFire.database.list(groupPath, {query: {
          orderByChild: 'completed',
          equalTo: this.filter$
        }});

        this.visibleGroups$ = this.filter$
          .switchMap(filter => filter === null ?
            this.groups$ : this.filteredGroups$);
      }
    });
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

  createGroup(props: any): void {
    this.groups$.push(
      new Group(props.name, props.location));
  }

  removeGroup(group: IGroup): void {
    this.groups$.remove(group.$key);
  }

  updateGroup(group: IGroup, changes: any): void {
    this.groups$.update(group.$key, changes);
  }

  sendCalendarInvites = () => {
    const headers = new Headers();
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
        .map(response => response.json());
  }
}
