import React, { PropTypes } from 'react';

const TaskForm = ({
  task,
  onChange,
  onSubmit,
  onBlur,
  onCancel
}) => {
  const handleSubmit = () => {
    console.log('handleSubmit');
    onSubmit(task);
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
    console.log('form blur');
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      noValidate
      onBlur={handleBlur}
    >
      <input
        autoComplete="off"
        onKeyUp={handleKeyUp}
        autoFocus
        className="task-form__input"
        maxLength="64"
        onChange={nameChange}
        placeholder="Coffee Group Name"
        type="text"
        value={task.name}
      />
      at
      <input
        autoComplete="off"
        onKeyUp={handleKeyUp}
        autoFocus
        className="task-form__input"
        maxLength="64"
        onChange={locationChange}
        placeholder="Meeting Location"
        type="text"
        value={task.location}
      />
      <button type="submit" style={{display: 'none'}}></button>
    </form>
  );
};

TaskForm.propTypes = {
  onBlur: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

export default TaskForm;
