import React from "react";
import { connect } from "react-redux";
import Ben from "src/assets/images/Ben.png";
import Lexis from "src/assets/images/Lexis.png";

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        At CoffeeIQ we believe people should be engaged and happy at work, and we are building tools to help every
        company make that a reality.
      </p>
      <div>
        <h1>Team</h1>
        <div>
          CoffeeIQ’s founders came together over a shared passion for great company culture and a desire to make work
          great for everyone — and we are building a company that embodies these ideals while also instilling them in
          others.
        </div>
        <h3>Ben</h3>
        <img src={Ben} alt="ben" style={{ height: 200, width: 200 }} />
        <h3>Lexis</h3>
        <img src={Lexis} alt="lexis" style={{ height: 200, width: 200 }} />
      </div>
    </div>
  );
};

AboutPage.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(AboutPage);
