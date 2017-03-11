import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IGroup } from '../models/group';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-item',
  styles: [
    require('./group-item.scss')
  ],
  template: require('./group-item.html')
})

export class GroupItemComponent {
  @Input() group: IGroup;
  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  editing: boolean = false;
  name: string = '';
  location: string = '';

  editTitle(): void {
    this.editing = true;
    this.name = this.group.name;
    this.location = this.group.location;
  }

  saveTitle(): void {
    if (this.editing) {
      const name: string = this.name.trim();
      const location: string = this.location.trim();
      const nameAndLocationExist = name.length && location.length;
      const nameIsNew = name.length && name !== this.group.name;
      const locationIsNew = location.length && location !== this.group.location;
      if (nameAndLocationExist && (nameIsNew || locationIsNew)) {
        this.update.emit({name, location});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.update.emit({
      // completed: !this.group.completed
    });
  }
}
