/* tslint:disable:no-string-literal */

export interface IGroup {
  $key?: string;
  completed: boolean;
  members: string[];
  createdAt: number;
  title: string;
  location: string;
}

export class Group implements IGroup {
  completed: boolean = false;
  members: string[] = [];
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  title: string;
  location: string;

  constructor(title: string, location: string) {
    console.log('class created', title, location);
    this.title = title;
    this.location = location;
  }
}
