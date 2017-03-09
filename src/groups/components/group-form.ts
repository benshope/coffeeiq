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
        [(ngModel)]="title"
        (keyup.escape)="clear()"
        autocomplete="off"
        autofocus
        class="group-form__input"
        name="title"
        placeholder="Create a new group..."
        required
        type="text"
      >
      <input
        [(ngModel)]="location"
        (keyup.escape)="clear()"
        autocomplete="off"
        class="group-form__input"
        name="location"
        placeholder="Location - where should coffee meetings happen?"
        required
        type="text"
      >
    </form>
  `
})

export class GroupFormComponent {
  @Output() createGroup = new EventEmitter(false);

  title: string = '';
  location: string = '';

  clear(): void {
    this.title = '';
    this.location = '';
  }

  submit(): void {
    const title: string = this.title.trim();
    const location: string = this.location.trim();
    console.log('submit', title, location);
    if (title.length && location.length) {
      this.createGroup.emit({title, location});
    }
    this.clear();
  }
}
