import { Component, Input } from '@angular/core';

import { Group } from '../models/group';


@Component({
  selector: 'bc-group-authors',
  template: `
    <h5 md-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class GroupAuthorsComponent {
  @Input() group: Group;

  get authors() {
    return this.group.volumeInfo.authors;
  }
}
