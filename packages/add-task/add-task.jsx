const React = require('react');
const PropTypes = require('prop-types');
const locale = require('core/locale').addTask;

const propTypes = { addTask: PropTypes.func.isRequired };

const AddTask = ({ addTask }) => {
  let inputElement;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!inputElement.value.trim()) {
      return;
    }
    addTask(inputElement.value);
    inputElement.value = '';
  };

  return (
    <form className="add-task" onSubmit={onSubmit}>
      <input
        className="add-task_field"
        type="text"
        id="text"
        ref={(el) => { inputElement = el; }}
      />
      <button className='add-task_button' type='submit'>{locale.buttonLabel}</button>
    </form>
  );
};

AddTask.propTypes = propTypes;

module.exports = AddTask;
