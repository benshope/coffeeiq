import PropTypes from "prop-types";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class UsersForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: ""
        };
    }

    updateEmail = e => {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            email: value
        }));
    };

    render() {
        return (
            <div className="users-form">
                <input
                    className="users-input"
                    placeholder="Email..."
                    value={this.state.email}
                    onChange={this.updateEmail}
                />
                <button
                    className="invite-button"
                    onClick={() => {
                        this.props.createInvite(this.state.email);
                        this.setState(state => ({
                            ...state,
                            email: ""
                        }));
                    }}
                    disabled={!this.state.email}
                >
                    Invite
                </button>
            </div>
        );
    }
}

UsersForm.propTypes = {
    createInvite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    createInvite: orgActions.createInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersForm);
