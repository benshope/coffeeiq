import { isEqual } from "lodash";
import React, { PropTypes } from "react";

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.newState();
  }

  newState() {
    return (
      this.props.group || {
        name: "",
        location: "",
        members: ""
      }
    );
  }

  updateState(partialState) {
    this.setState({ ...this.state, ...partialState });
  }

  onSubmit() {
    this.props.onChange(this.state);
  }

  onCancel() {
    this.setState(this.newState());
  }

  onNameChange(e) {
    this.updateState({ name: e.target.value });
  }

  onLocationChange(e) {
    this.updateState({ location: e.target.value });
  }

  onMembersChange(e) {
    this.updateState({ members: e.target.value });
  }

  render() {
    const { name, location, members } = this.state;
    const group = this.props;
    const noChanges = isEqual(group, this.state);
    return (
      <form className="group-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus={true}
          className="group-form-input"
          maxLength="64"
          onChange={this.onNameChange}
          placeholder="Group Name"
          type="text"
          value={name}
        />
        <span className="divider">@</span>
        <input
          autoComplete="off"
          className="group-form-input"
          maxLength="64"
          onChange={this.onLocationChange}
          placeholder="Meeting Location"
          type="text"
          value={location}
        />
        <textarea
          className="group-form-textarea"
          maxLength="64"
          onChange={this.onLocationChange}
          placeholder="TODO: Group Members"
          type="text"
          value={members}
        />
        <button disabled={noChanges} onClick={this.onCancel}>
          Cancel
        </button>
        <button disabled={noChanges} onClick={this.onSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

GroupForm.propTypes = {
  group: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default GroupForm;
