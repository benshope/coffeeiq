import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { IGroup } from '../models/group';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-list',
  styles: [
    require('./group-list.scss')
  ],
  template: `
    <ul class="group-filters">
      <li><a [class.active]="!filter" [routerLink]="['/groups']">View All</a></li>
      <li><a [class.active]="filter === 'false'" [routerLink]="['/groups', {completed: false}]">Active</a></li>
      <li><a [class.active]="filter === 'true'" [routerLink]="['/groups', {completed: true}]">Completed</a></li>
    </ul>

    <div class="group-list">
      <group-item
        *ngFor="let group of groups | async"
        [group]="group"
        (remove)="remove.emit(group)"
        (update)="update.emit({group: group, changes: $event})"></group-item>
    </div>
  `
})

export class GroupListComponent {
  @Input() filter: string;
  @Input() groups: FirebaseListObservable<IGroup[]>;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);
}
