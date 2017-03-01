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
  title: string = '';

  editTitle(): void {
    this.editing = true;
    this.title = this.group.title;
  }

  saveTitle(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.group.title) {
        this.update.emit({title});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.update.emit({
      completed: !this.group.completed
    });
  }
}
