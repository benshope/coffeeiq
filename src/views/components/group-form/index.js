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
        <form
            className="group-form"
            onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                return (group.key ? updateGroup : createGroup)(group);
            }}
        >
            <input
                autofocus={!!groupForm.key}
                disabled={groupForm.sending}
                className="group-input"
                placeholder="Name..."
                value={(!groupForm.sending && group.name) || ""}
                onChange={e => updateGroupFormName(e.target.value)}
            />
            <input
                disabled={groupForm.sending}
                className="group-input"
                placeholder="Location..."
                value={(!groupForm.sending && group.location) || ""}
                onChange={e => updateGroupFormLocation(e.target.value)}
            />
            <input
                className="create-or-update-button"
                onClick={() => (groupForm.key ? updateGroup : createGroup)(groupForm)}
                type="submit"
                disabled={
                    groupForm.sending || !group.name || !group.location || isEqual(group, groups[groupForm.key] || {})
                }
                value={groupForm.key ? "Update" : "Create"}
            />
        </form>
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
