export class Task {
  completed: false;
  key: null;
  title: null;
  constructor(attrs) {
    this.completed = attrs.completed;
    this.key = attrs.key;
    this.title = attrs.title;
  }
}
