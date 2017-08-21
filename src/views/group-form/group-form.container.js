import { connect } from "react-redux";
import { groupActions } from "core/groups";

import GroupForm from "./group-form.component";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onChange: groupActions.createGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
