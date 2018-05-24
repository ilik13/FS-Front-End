const React = require('react');
const PropTypes = require('prop-types');
const className = require('class-name/class-name');

const propTypes = {
  item: PropTypes.object.isRequired,
};

const Task = ({ item }) => (
  <p
    className={className({ name: 'task', mods: { completed: item.isCompleted } })}>
    {item.text}
  </p>
);

Task.propTypes = propTypes;

module.exports = Task;
