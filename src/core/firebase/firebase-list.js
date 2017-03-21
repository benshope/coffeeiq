import { Observable } from 'rxjs';
import { firebaseDb } from './firebase';

export class FirebaseList {
  constructor(actions, modelClass) {
    this._actions = actions;
    this._modelClass = modelClass;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this.path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  actionStream() {
    let ref = firebaseDb.ref(this.path);
    let initialized = false;
    let list = [];
    return Observable.create((observer) => {
      ref.once('value', () => {
        console.log('firebase actionStream value');
        initialized = true;
        observer.next(this._actions.onLoad(list));
      });

      ref.on('child_added', snapshot => {
        console.log('firebase actionStream child_added');
        if (initialized) {
          observer.next(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
        }
        else {
          list.push(this.unwrapSnapshot(snapshot));
        }
      });

      ref.on('child_changed', snapshot => {
        observer.next(this._actions.onChange(this.unwrapSnapshot(snapshot)));
      });

      ref.on('child_removed', snapshot => {
        observer.next(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
      });
    });
  }

  unwrapSnapshot(snapshot) {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs);
  }
}
