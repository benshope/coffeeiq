import PropTypes from "prop-types";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const newState = { email: "" };

class UsersForm extends React.Component {
    constructor() {
        super();
        this.state = { ...newState };
    }

    updateEmail = e => {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            isWrongDomain: value && value.toLowerCase().indexOf(this.props.auth.domain.toLowerCase()) > -1,
            email: value.toLowerCase()
        }));
    };

    onSubmit = event => {
        event.preventDefault(); // stops page from refreshing
        if (!this.state.isWrongDomain) {
            alert(`"${this.state.email}" must end with "@${this.props.auth.domain}"`);
            return;
        }
        this.props.createInvite(this.state.email);
        this.setState(state => ({ ...newState }));
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="users-form">
                <input
                    className="users-input"
                    placeholder="Email..."
                    type="email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                />
                <input style={{ display: "none" }} className="button invite-button" type="submit" value="Invite" />
                <button className="invite-button" onClick={this.onSubmit}>
                    Invite
                </button>
            </form>
        );
    }
}

UsersForm.propTypes = {
    auth: PropTypes.object.isRequired,
    createInvite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    createInvite: orgActions.createInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersForm);
