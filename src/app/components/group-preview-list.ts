import { Component, Input } from '@angular/core';
import { Group } from '../models/group';

@Component({
  selector: 'bc-group-preview-list',
  template: `
    <bc-group-preview *ngFor="let group of groups" [group]="group"></bc-group-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class GroupPreviewListComponent {
  @Input() groups: Group[];
}
