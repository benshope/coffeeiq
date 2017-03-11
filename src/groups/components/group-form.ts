import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-form',
  styles: [
    require('./group-form.scss')
  ],
  template: `
    <form class="group-form" (ngSubmit)="submit()" novalidate>
      <input style="width:0; visibility:hidden" type="submit">
      <input
        [(ngModel)]="name"
        (keyup.escape)="clear()"
        autocomplete="off"
        autofocus
        class="group-form__input"
        name="name"
        placeholder="Group name..."
        required
        type="text"
      >
      <span class="between-inputs">
        @
      </span>
      <input
        [(ngModel)]="location"
        (keyup.escape)="clear()"
        autocomplete="off"
        class="group-form__input"
        name="location"
        placeholder="Group location..."
        required
        type="text"
      >
    </form>
  `
})

export class GroupFormComponent {
  @Output() createGroup = new EventEmitter(false);

  name: string = '';
  location: string = '';

  clear(): void {
    this.name = '';
    this.location = '';
  }

  submit(): void {
    const name: string = this.name.trim();
    const location: string = this.location.trim();
    if (name.length && location.length) {
      this.createGroup.emit({name, location});
    }
    this.clear();
  }
}
