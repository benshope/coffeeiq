import { Observable } from "rxjs";

export const firebaseUpdateActions$ = (action$, onValue, onChildAdded, onChildChanged, onChildRemoved) =>
  action$.flatMap(ref => {
    const unwrap = snapshot => ({
      path: snapshot.key,
      value: snapshot.val()
    });
    return Observable.create(observer => {
      ref.once("value", x => observer.next(onValue(x.val())));
      ref.on("child_added", x => observer.next(onChildAdded(unwrap(x))));
      ref.on("child_changed", x => observer.next(onChildChanged(unwrap(x))));
      ref.on("child_removed", x => observer.next(onChildRemoved(unwrap(x))));
    });
  });
