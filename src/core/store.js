import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import {
  createEpicMiddleware
} from 'redux-observable';
import {
  rootEpic,
  rootReducer
} from './reducers';

export default (initialState = {}) => {

  let epicMiddleware = createEpicMiddleware(rootEpic);

  // if (process.env.NODE_ENV !== 'production') {
  //   // configure redux-devtools-extension
  //   // @see https://github.com/zalmoxisus/redux-devtools-extension
  //   const devToolsExtension = window.devToolsExtension;
  //   if (typeof devToolsExtension === 'function') {
  //     epicMiddleware = compose(epicMiddleware, devToolsExtension());
  //   }
  // }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware)));

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(require('./reducers').rootReducer);
  //   });
  // }

  return store;
};
