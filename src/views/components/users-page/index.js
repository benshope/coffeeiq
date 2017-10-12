// import { capitalize } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserList from "../user-list/user-list.container";
import UsersForm from "../users-form";

const UsersPage = ({ auth }) => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <UserList />
      <UsersForm />
    </div>
  );
};

UsersPage.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersPage)
);
