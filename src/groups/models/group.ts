/* tslint:disable:no-string-literal */

export interface IGroup {
  $key?: string;
  completed: boolean;
  members: string[];
  createdAt: number;
  title: string;
}

export class Group implements IGroup {
  completed: boolean = false;
  members: string[] = [];
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
