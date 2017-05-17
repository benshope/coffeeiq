import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { groupActions } from 'core/groups';
import GroupFilters from 'views/components/group-filters';
import GroupForm from 'views/components/group-form/group-form.container';
import GroupList from 'views/components/group-list';

const GroupsPage = ({createGroup, location, groups}) => {
  const { filter } = location.query;

  return (
    <div className="g-row">
      <div className="g-col">
        <GroupForm handleSubmit={createGroup} />
      </div>

      <div className="g-col">
        <GroupFilters filter={filter} />
        <GroupList
          groups={groups}
        />
      </div>
    </div>
  );
};

GroupsPage.propTypes = {
  createGroup: PropTypes.func.isRequired,
  filterGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  removeGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  groups: state.groups.list
});


const mapDispatchToProps = {
  createGroup: groupActions.createGroup,
  filterGroups: groupActions.filterGroups,
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsPage);
