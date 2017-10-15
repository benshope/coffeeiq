import React from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import Ben from "src/assets/images/Ben.png";
import Lexis from "src/assets/images/Lexis.png";

const AboutPage = () => {
  return (
    <div>
      <h1>We built CoffeeIQ because....</h1>
        <p>we iz cool</p>
      <div>
        <h1>Team...</h1>
          <h3>Ben</h3>
            <img src={Ben} alt="ben" style={{height: 200, width: 200}} />
          <h3>Lexis</h3>
            <img src={Lexis} alt="lexis" style={{height: 200, width: 200}} />
      </div>
    </div>

  );
};

AboutPage.propTypes = {};

//=====================================
//  CONNECT
//-------------------------

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(AboutPage);
