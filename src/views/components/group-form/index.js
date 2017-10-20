import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { groupFormActions } from "src/group-form";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";

const GroupForm = ({
    createGroup,
    groupForm,
    groups,
    updateGroup,
    updateGroupForm,
    updateGroupFormName,
    updateGroupFormLocation
}) => {
    const group = groupForm.value;
    return (
        <div className="group-form">
            <input
                className="group-input"
                placeholder="Name..."
                value={group.name}
                onChange={e => updateGroupFormName(e.target.value)}
            />
            <input
                className="group-input"
                placeholder="Location..."
                value={group.location}
                onChange={e => updateGroupFormLocation(e.target.value)}
            />
            <button
                className="create-or-update-button"
                onClick={() => (group.key ? updateGroup : createGroup)(this.state.group)}
                disabled={!group.name || !group.location || isEqual(this.state.group, groups[groupForm.key] || {})}
            >
                {groupForm.key ? `Update` : `Create`}
            </button>
        </div>
    );
};

GroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired,
    group: PropTypes.object,
    updateGroup: PropTypes.func.isRequired,
    updateGroupForm: PropTypes.func.isRequired,
    updateGroupFormName: PropTypes.func.isRequired,
    updateGroupFormLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    groupForm: state.groupForm,
    groups: (state.org[state.auth.orgId] || {}).groups || {}
});

const mapDispatchToProps = {
    createGroup: orgActions.createGroup,
    updateGroup: orgActions.updateGroup,
    updateGroupForm: groupFormActions.updateGroupForm,
    updateGroupFormName: groupFormActions.updateGroupFormName,
    updateGroupFormLocation: groupFormActions.updateGroupFormLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
