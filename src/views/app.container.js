import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { authActions } from "core/auth";
import Header from "views/header";
import Particles from "views/particles";

const App = ({ authenticated, children, signOut }) =>
  <div>
    {false && <Particles />}
    <Header authenticated={authenticated} signOut={signOut} />
    <main>
      {children}
    </main>
  </div>;

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.element,
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
