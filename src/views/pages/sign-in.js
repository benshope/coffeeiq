import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { authActions } from 'core/auth';
import Button from 'views/components/button';

const SignInPage = ({signIn}) => {
  return (
    <div className="home-page">
      <div className="g-row sign-in">
        <div className="g-col">
          <h1 className="sign-in__heading">Meet Your Team</h1>
          <div className="description">
            CoffeeIQ schedules a quick coffee meeting each week with a random coworker.
          </div>
          <Button
            className="sign-in__button"
            onClick={signIn}
          >
            <img width="25" height="25" src="assets/images/google.svg" /> Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  signIn: PropTypes.func.isRequired
};

// This helps you build a network, strengthens company culture, and shares knowledge.
// Most importantly, CoffeeIQ is a fun way to make new friends.

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
