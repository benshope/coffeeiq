import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { notificationsActions } from "src/notifications";

const Notifications = ({ notifications, deleteNotification }) => (
  <ul className="notification-list">
    {notifications.map((notification, i) => (
      <li className={`notification-item ${notification.type.toLowerCase()}`} key={notification.id}>
        <span className="notification-message">{notification.message}</span>{" "}
        {notification.duration ? (
          <div className="loader-container">
            <div className="loader">
              <svg className="progress" width="24" height="24" viewBox="0 0 24 24">
                <circle className="progress__meter" cx="12" cy="12" r="6" strokeWidth="3" />
                <circle className="progress__value" cx="12" cy="12" r="6" strokeWidth="3" />
              </svg>
            </div>
          </div>
        ) : (
          <a className="delete-notification" onClick={() => deleteNotification(notification.id)}>
            ×
          </a>
        )}
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
