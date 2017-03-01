import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-form',
  styles: [
    require('./group-form.scss')
  ],
  template: `
    <form class="group-form" (ngSubmit)="submit()" novalidate>
      <input
        [(ngModel)]="title"
        (keyup.escape)="clear()"
        autocomplete="off"
        autofocus
        class="group-form__input"
        name="title"
        placeholder="What needs to be done?"
        required
        type="text"
      >
    </form>
  `
})

export class GroupFormComponent {
  @Output() createGroup = new EventEmitter(false);

  title: string = '';

  clear(): void {
    this.title = '';
  }

  submit(): void {
    const title: string = this.title.trim();
    if (title.length) {
      this.createGroup.emit(title);
    }
    this.clear();
  }
}
