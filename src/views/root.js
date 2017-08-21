import React, { PropTypes } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { getRoutes } from "./routes";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const Root = ({ history, store }) =>
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={getRoutes(store.getState)} />
    </Provider>
  </MuiThemeProvider>;

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
