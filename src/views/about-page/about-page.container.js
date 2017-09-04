import React from "react";
import { connect } from "react-redux";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="g-row about">
        <div className="g-col">
          <h1 className="about__heading">About</h1>
                    <div className="description">
            CoffeeIQ schedules a quick coffee meeting each week with a random
            coworker. Selfies hammock meh, seitan hella raclette polaroid
            slow-carb. VHS bushwick gentrify,fam coloring book letterpress
            keytar kale chips. Prism flexitarian woke viral etsy. Pork belly
            portland celiac, biodiesel keytar twee yuccie art party.
          </div>
        </div>
      </div>
    </div>
  );
};

AboutPage.propTypes = {    };

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(AboutPage);
