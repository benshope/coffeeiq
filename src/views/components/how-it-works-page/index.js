import React from "react";
import { connect } from "react-redux";
import { BlueStripes } from "../stripes";

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      <BlueStripes />
      <div className="hero">
        <h1 className="">How it Works</h1>
        <div className="description">
          CoffeeIQ is about bringing people together. Our algorithm regularly
          pairs up team members who don’t know each other well to spread trust
          and collaboration across your organization.
        </div>
      </div>
      {false && (
        <div>
          <h2>User Story</h2>
          <p style={{ marginTop: 10 }}>
            Katie works in Sales. Marcus works in Engineering. They've worked at
            the same company together for a year, but they've never had a
            conversation. Sales doesn't talk to Engineering. HR doesn't talk to
            Marketing. Finance doesn't talk to IT Support (unless a laptop is
            not cooperating). Sometimes, that's just the way it is.
          </p>
          <p style={{ marginTop: 10 }}>
            Even with a stellar company culture, it's hard to meet with
            teammates you don't interact with on a daily basis. Either you don't
            think about reaching out, or you don't know how to spark the
            conversation.
          </p>
          <p style={{ marginTop: 10 }}>
            CoffeeIQ breaks down silos so you can have more genuine interactions
            (and friendships) across your company. Managers love CoffeeIQ
            because it promotes team culture, collaboration, and knowledge
            sharing. Teammates love CofeeIQ because they can meet with people
            they normally wouldn't talk to, better understand a person's role,
            or find ways to help each other.
          </p>
          {/* Would be neat to have graphic to describe each step here... */}
          <ul style={{ marginTop: 10 }}>
            <li>1) Invite your team to sign up to CoffeeIQ</li>
            <li>
              2) Join groups of your teammates you’re interested in meeting
            </li>
            <li>
              3) Wait for calendar invite with your randomly-paired coffee mate!
            </li>
            <li>4) That’s it - accept and caffeinate together!</li>
          </ul>
        </div>
      )}
    </div>
  );
};

HowItWorksPage.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(HowItWorksPage);
