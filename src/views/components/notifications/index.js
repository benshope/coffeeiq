import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { notificationsActions } from "src/notifications";

const Notifications = ({ notifications, deleteNotification }) => (
  <ul className="notification-list">
    {notifications.map((notification, i) => (
      <li className={`notification-item ${notification.type.toLowerCase()}`} key={notification.id}>
        <span className="notification-message">{notification.message}</span>{" "}
        <div className="demo">
          <svg className="progress" width="120" height="120" viewBox="0 0 120 120">
            <circle className="progress__meter" cx="60" cy="60" r="54" strokeWidth="12" />
            <circle className="progress__value" cx="60" cy="60" r="54" strokeWidth="12" />
          </svg>
        </div>
        <a onClick={() => deleteNotification(notification.id)}>X</a>
      </li>
    ))}
  </ul>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = {
  deleteNotification: notificationsActions.deleteNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
