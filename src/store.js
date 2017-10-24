import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import epics from "./epics";
import history from "./history";
import reducers from "./reducers";

export default function configureStore() {
  let epicMiddleware = createEpicMiddleware(epics);
  let middleware = applyMiddleware(epicMiddleware, routerMiddleware(history));

  if (process.env.NODE_ENV !== "production") {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === "function") {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, middleware);
  // sagaMiddleware.run(sagas);
  // TODO: do I need to do anything with epics here?

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(require("./reducers").default);
    });
  }

  return store;
}
