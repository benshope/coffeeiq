import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'src/core/auth';

export function SignIn({signIn}) {
  return (
    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">
          Sign in
        </h1>
        <button
          className="btn sign-in__button"
          onClick={signIn}
          type="button"
        >
          Google
        </button>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(SignIn);
