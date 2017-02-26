import thunk from 'redux-thunk';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import {
  createEpicMiddleware
} from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

export default (initialState = {}) => {
  let epicMiddleware = createEpicMiddleware(rootEpic);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware), applyMiddleware(thunk)));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};
