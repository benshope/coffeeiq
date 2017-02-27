import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';
import { FirebaseAuth } from 'angularfire2';
import { Http, Headers } from '@angular/http';
import { Inject } from '@angular/core';


@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <task-form (createTask)="taskService.createTask($event)"></task-form>
      </div>
      <button (click)="sendCalendarInvites()">Send Calendar Invites</button>
      <div class="g-col">
        <task-list
          [filter]="filter | async"
          [tasks]="taskService.visibleTasks$"
          (remove)="taskService.removeTask($event)"
          (update)="taskService.updateTask($event.task, $event.changes)"></task-list>
      </div>
    </div>
  `
})

export class TasksComponent {
  filter: Observable<any>;
  authToken: string;

  constructor(
    public route: ActivatedRoute,
    public taskService: TaskService,
    public auth$: FirebaseAuth,
    @Inject(Http) private http: Http
  ) {
    this.filter = route.params
      .pluck('completed')
      .do((value: string) => taskService.filterTasks(value));
    auth$.subscribe((state: any) => {
      this.authToken = state.auth.v;
      console.log(state, 'booyah');
    });
  }

  public getRequest = (endpoint: any) => {
    let headers = new Headers();
    console.log('getRequest');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://www.googleapis.com/gmail/v1/' + endpoint,
      { headers: headers }
    ).map(response => response.json())
    .subscribe(console.log, console.error);
  }

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

  sendCalendarInvites = () => {
    this.getRequest('users/me/profile');
    console.log('send calendar invites');
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
