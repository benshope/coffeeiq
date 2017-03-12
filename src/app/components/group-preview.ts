import { Component, Input } from '@angular/core';
import { Group } from '../models/group';


@Component({
  selector: 'bc-group-preview',
  template: `
    <a [routerLink]="['/group', id]">
      <md-card>
        <md-card-title-group>
          <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          <md-card-title>{{ title | bcEllipsis:35 }}</md-card-title>
          <md-card-subtitle *ngIf="subtitle">{{ subtitle | bcEllipsis:40 }}</md-card-subtitle>
        </md-card-title-group>
        <md-card-content>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
        </md-card-content>
        <md-card-footer>
          <bc-group-authors [group]="group"></bc-group-authors>
        </md-card-footer>
      </md-card>
    </a>
  `,
  styles: [`
    md-card {
      width: 400px;
      height: 300px;
      margin: 15px;
    }
    @media only screen and (max-width: 768px) {
      md-card {
        margin: 15px 0 !important;
      }
    }
    md-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    md-card-title {
      margin-right: 10px;
    }
    md-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding: 0 25px 25px;
    }
  `]
})
export class GroupPreviewComponent {
  @Input() group: Group;

  get id() {
    return this.group.id;
  }

  get title() {
    return this.group.volumeInfo.title;
  }

  get subtitle() {
    return this.group.volumeInfo.subtitle;
  }

  get description() {
    return this.group.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.group.volumeInfo.imageLinks) {
      return this.group.volumeInfo.imageLinks.smallThumbnail;
    }

    return false;
  }
}
