import PropTypes from "prop-types";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const newState = { email: "" };

// TODO: make stateless
class InviteForm extends React.Component {
    constructor() {
        super();
        this.state = { ...newState };
    }

    updateEmail(e) {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            isWrongDomain:
                value &&
                value
                    .toLowerCase()
                    .indexOf(this.props.auth.domain.toLowerCase()) > -1,
            email: value.toLowerCase()
        }));
    }

    onSubmit(e) {
        e.preventDefault(); // stops page from refreshing
        if (!this.state.isWrongDomain) {
            alert(
                `"${this.state.email}" must end with "@${this.props.auth
                    .domain}"`
            );
            // TODO: refocus
            return;
        }
        this.props.createInvite({
            email: this.state.email,
            groupId: this.props.groupId
        });
        this.setState(state => ({ ...newState }));
    }

    onKeyDown(e) {
        if (e.keyCode === 27) {
            this.setState(state => ({ ...newState }));
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="invite-form">
                <input
                    required={true}
                    className="invite-input"
                    placeholder="Email..."
                    type="email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                    onKeyDown={this.onKeyDown}
                />
                <input
                    disabled={!this.state.email}
                    className="button invite-button"
                    type="submit"
                    value="Invite"
                />
            </form>
        );
    }
}

InviteForm.propTypes = {
    auth: PropTypes.object.isRequired,
    createInvite: PropTypes.func.isRequired,
    groupId: PropTypes.string
};

const mapStateToProps = (state, passedProps) => ({
    ...passedProps,
    auth: state.auth
});

const mapDispatchToProps = {
    createInvite: orgActions.createInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
