import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import 'rxjs';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GroupService } from '../services/group-service';
import { FirebaseAuth, FirebaseAuthState, AngularFire, AngularFireAuth } from 'angularfire2';
import { Http, Headers } from '@angular/http';
import { Inject } from '@angular/core';


@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <group-form (createGroup)="groupService.createGroup($event)"></group-form>
      </div>
      <button (click)="sendCalendarInvites()">Send Calendar Invites</button>
      <div class="g-col">
        <group-list
          [filter]="filter | async"
          [groups]="groupService.visibleGroups$"
          (remove)="groupService.removeGroup($event)"
          (update)="groupService.updateGroup($event.group, $event.changes)"></group-list>
      </div>
    </div>
  `
})

export class GroupsComponent {
  filter: Observable<any>;
  apiToken: string;

  constructor(
    public route: ActivatedRoute,
    public groupService: GroupService,
    public auth$: FirebaseAuth,
    public angularFire: AngularFire,
    public angularFireAuth: AngularFireAuth,
    @Inject(Http) private http: Http
  ) {
    this.filter = route.params
      .pluck('completed')
      .do((value: string) => groupService.filterGroups(value));
    auth$.subscribe((state: FirebaseAuthState) => {
      state.auth.getToken().then(
      (token: any) => { console.log('token', token); this.apiToken = token; },
      console.error);
    });
  }

  public getRequest = (endpoint: any) => {
    let headers = new Headers();
    console.log('getRequest');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    headers.append('Content-Type', 'application/json');
//     return this.http.get(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       { headers: headers }
//     )
    return this.http.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendNotifications=true',
      {
        attachments: [],
        location: 'The bedroom of Lexis',
        summary: 'Martin Luther King, Jr. Day',
        description: 'An important civil rights holiday',
        attendees: [
        {email: 'nimajnebs@gmail.com'}, {email: 'lexishanson@gmail.com'}],
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
  }

// const sendRequest = (
//   type,
//   url,
//   data,
//   config
// ) => {
//   console.log('send request called');
//   var headers = new Headers();
//   headers.set('Content-Type', 'application/json;charset=UTF-8');
//   headers.set('Authorization', config.Authorization);
//   return fetch(new Request(
//     url,
//     {
//       body: JSON.stringify(data),
//       cache: 'no-cache',
//       credentials: 'include',
//       headers: headers,
//       type: type
//       // mode: 'cors'
//     }));
// };

// export function sendCalendarInvites() {
//   var headers = {
//     Authorization: 'Bearer ', // + payload.accessToken,
//     noXsrfToken: true
//   };
//   sendRequest(
//     'GET',
//     'https://www.googleapis.com/calendar/v3/calendars/main/events',
//     undefined,
//     headers).then(
//       () => { console.log('SUCCESS'); },
//       () => { console.log('ERROR'); });
//   return {
//     type: SEND_CALENDAR_INVITES
//   };
// }

  // public sendRequest = (
  //   type,
  //   url,
  //   data,
  //   config
  // ) => {

  //   let Headers: any;
  //   let fetch: any;
  //   let Request: any;

  //   console.log('send request called');
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json;charset=UTF-8');
  //   headers.set('Authorization', config.Authorization);
  //   return fetch(new Request(
  //     url,
  //     {
  //       body: JSON.stringify(data),
  //       cache: 'no-cache',
  //       credentials: 'include',
  //       headers: headers,
  //       type: type
  //       // mode: 'cors'
  //     }));
  // };

  // accessTokenStream = () => {
  //   return this.http.get(
  //     'https://www.googleapis.com/oauth2/v3/tokeninfo' +
  //     '?access_token=' + this.apiToken)
  //     .map((response) => {
  //       console.log('FETCHED ACCESS FROM REFRESH', response);
  //       this.getRequest('users/me/profile');
  //       return response.json();
  //     });
  // }

  sendCalendarInvites = () => {
    this.getRequest('users/me/profile');
    // console.log('send calendar invites', this.angularFire.auth.getAuth().auth.getToken(false));
    // this.accessTokenStream().subscribe(console.log, console.error);

    // var headers = {
    //   Authorization: 'Bearer ' + this.authToken,
    //   noXsrfToken: true
    // };
    // this.sendRequest(
    //   'GET',
    //   'https://www.googleapis.com/calendar/v3/calendars/main/events',
    //   undefined,
    //   headers).then(
    //     () => { console.log('SUCCESS'); },
    //     () => { console.log('ERROR'); });
  };
}
