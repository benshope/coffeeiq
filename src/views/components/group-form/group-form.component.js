import React, { PropTypes } from 'react';

const GroupForm = ({
  autoFocus,
  group,
  onChange,
  onSubmit,
  onBlur,
  onCancel
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // stops page refresh
    console.log('handleSubmit');
    onSubmit(group);
  };
  const nameChange = (e) => {
    console.log(e.target.value);
    onChange({ name: e.target.value });
  };
  const locationChange = (e) => {
    console.log(e.target.value);
    onChange({ location: e.target.value });
  };
  const handleKeyUp = (event) => {
    if (onCancel && event.keyCode === 13 || event.keyCode === 27) {
      onCancel();
    }
  };
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <form
      className="group-form"
      onSubmit={handleSubmit}
      noValidate
      onBlur={handleBlur}
    >
      <input
        autoComplete="off"
        onKeyUp={handleKeyUp}
        autoFocus={autoFocus}
        className="group-form__input"
        maxLength="64"
        onChange={nameChange}
        placeholder="Group Name"
        type="text"
        value={group.name}
      />
      <span className="divider">@</span>
      <input
        autoComplete="off"
        onKeyUp={handleKeyUp}
        className="group-form__input"
        maxLength="64"
        onChange={locationChange}
        placeholder="Meeting Location"
        type="text"
        value={group.location}
      />
      <button type="submit" href="" style={{display: 'none'}}></button>
    </form>
  );
};

GroupForm.propTypes = {
  autoFocus: PropTypes.bool,
  group: PropTypes.object.isRequired,
  onBlur: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default GroupForm;
