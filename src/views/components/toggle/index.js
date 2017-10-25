import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const Toggle = ({ checked, id, onChange, value }) => (
    <div className="toggle">
        <input className="toggle-input" id={id} value={value} checked={checked} onChange={onChange} type="checkbox" />
        <label className="toggle-label" htmlFor={id} />
    </div>
);

Toggle.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps, {})(Toggle);
