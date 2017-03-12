export interface IMember {
  $key?: string;
  createdAt: number;
  name: string;
  email: string;
  groupIds: string[];
}

export class Member implements IMember {
  createdAt: number = new Date().getTime();
  name: string;
  email: string;
  groupIds: string[] = [];
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
