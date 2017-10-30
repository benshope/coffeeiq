import { connect } from "react-redux";
import InviteList from "../invite-list";

const mapStateToProps = state => ({
  invites: (state.org[state.auth.orgId] || {}).invites || {}
});

export default connect(mapStateToProps, {})(InviteList);
