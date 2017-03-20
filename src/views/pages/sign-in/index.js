import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Button from 'views/components/button';


const SignInPage = ({signInWithGoogle}) => {
  return (
    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <Button className="sign-in__button" onClick={signInWithGoogle}>Google</Button>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithGoogle: authActions.signInWithGoogle
};

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
