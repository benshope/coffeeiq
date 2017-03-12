/* tslint:disable:no-string-literal */

export interface IGroup {
  $key?: string;
  createdAt: number;
  name: string;
  location: string;
  memberIds: string[];
}

export class Group implements IGroup {
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  name: string;
  location: string;
  memberIds: string[] = [];
  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }
}
