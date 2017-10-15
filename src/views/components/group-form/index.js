import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class GroupForm extends React.Component {
    constructor({ group }) {
        super();
        this.state = { group: { ...(group || { name: "", location: "" }) } };
    }

    updateName = e => {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            group: {
                ...state.group,
                name: value
            }
        }));
    };

    updateLocation = e => {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            group: {
                ...state.group,
                location: value
            }
        }));
    };

    render() {
        const group = this.state.group;
        const { groups, groupId, createGroup, updateGroup } = this.props;
        return (
            <div className="group-form">
                <input className="group-input" placeholder="Name..." value={group.name} onChange={this.updateName} />
                <input
                    className="group-input"
                    placeholder="Location..."
                    value={group.location}
                    onChange={this.updateLocation}
                />
                <button
                    className="create-or-update-button"
                    onClick={() => (groupId ? updateGroup : createGroup)(this.state.group)}
                    disabled={!group.name || !group.location || isEqual(this.state.group, groups[groupId] || {})}
                >
                    {groupId ? `Update` : `Create`}
                </button>
            </div>
        );
    }
}

GroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired,
    groupId: PropTypes.string,
    updateGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    groups: (state.org[state.auth.orgId] || {}).groups || {}
});

const mapDispatchToProps = {
    createGroup: orgActions.createGroup,
    updateGroup: orgActions.updateGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
