import { connect } from 'react-redux';
import { groupActions } from 'core/groups';

import GroupForm from './group-form.component';

const mapStateToProps = state => ({
  group: state.groups.newGroup
});

const mapDispatchToProps = {
  onSubmit: groupActions.createGroup,
  onChange: groupActions.updateNewGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm);
