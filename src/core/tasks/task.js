export class Task {
  completed: false;
  editing: false;
  key: null;
  title: null;
  location: null;
  name: null;
  constructor(attrs) {
    this.completed = attrs.completed;
    this.key = attrs.key;
    this.title = attrs.title;
    this.name = attrs.name;
    this.location = attrs.location;
  }
}
