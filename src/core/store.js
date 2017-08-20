import { routerMiddleware } from "react-router-redux";
import { createEpicMiddleware } from "redux-observable";
import { applyMiddleware, compose, createStore } from "redux";
import createHistory from "history/createBrowserHistory";
import reducers from "./reducers";
import rootEpic from "./epics";

export function configureStore() {
  let epicMiddleware = createEpicMiddleware(rootEpic);
  const historyMiddleware = routerMiddleware(createHistory());

  let middleware = applyMiddleware(historyMiddleware, epicMiddleware);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancers(middleware));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(require("./reducers").default);
    });
  }

  return store;
}
