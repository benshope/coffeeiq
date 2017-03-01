import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import 'rxjs';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GroupService } from '../services/group-service';

@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <group-form (createGroup)="groupService.createGroup($event)"></group-form>
      </div>
      <!-- TODO: *ngIf user is admin
      <button
        (click)="groupService.sendCalendarInvites()"
      >
        Send Calendar Invites
      </button>
      -->
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

  constructor(
    public route: ActivatedRoute,
    public groupService: GroupService
  ) {
    this.filter = route.params
      .pluck('completed')
      .do((value: string) => groupService.filterGroups(value));
  }
}
