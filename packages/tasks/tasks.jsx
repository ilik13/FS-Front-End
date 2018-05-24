const React = require('react');
const Task = require('task/task.jsx');
const AddTask = require('add-task/add-task.jsx');
const className = require('class-name/class-name');
const locale = require('core/locale').tasks;
const { visibilityFilters, responseStatuses } = require('core/constants');
const createRequest = require('core/create-request');

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      activeFilter: visibilityFilters.ALL,
      isLoading: true,
      messages: [],
    };

    this.addTask = this.addTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  componentDidMount() {
    createRequest('fetchTasks').then((response) => {
      this.setState({ tasks: response.data || [], isLoading: false, messages: response.messages });
    });
    // createRequest('fetchTasks');
  }

  addTask(text) {
    const { tasks } = this.state;

    this.setState({ isLoading: true });
    createRequest('addTask', {}, { text }).then((response) => {
      if (response.status === responseStatuses.OK) {
        tasks.push(response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  toggleTask(id) {
    const { tasks } = this.state;
    let task = tasks.find((item) => item.id === id);

    this.setState({ isLoading: true });
    createRequest('updateTask', { id }, { isCompleted: !task.isCompleted }).then((response) => {
      if (response.status === responseStatuses.OK) {
        task = Object.assign(task, response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  changeFilter(newFilter) {
    this.setState({ activeFilter: newFilter });
  }

  render() {
    const { activeFilter, tasks, isLoading, messages } = this.state;

    const filteredTasks = tasks.filter((task) => {
      switch (activeFilter) {
        case visibilityFilters.ACTIVE:
          return !task.isCompleted;

        case visibilityFilters.COMPLETED:
          return task.isCompleted;

        case visibilityFilters.ALL:
        default:
          return true;
      }
    });

    return (

      <div className={className({ name: 'tasks', mods: { loading: isLoading } })}>
        <div id="wrapper">
          <div id="menu">
              <p className="welcome clearfix">Welcome,</p>
              <p className="logout clearfix">
                <a id="exit" href="#">Exit Chat</a>
              </p>
          </div>
          <div id="chatbox">
                {filteredTasks.map((item) => (
                  <Task item={item} key={item.id} />
                ))}
          </div>
          <form name="message" action="">
              <input name="usermsg" type="text" id="usermsg"/>
              <input name="submitmsg" type="submit"  id="submitmsg" value="Select" />
              <AddTask addTask={this.addTask} />
          </form>
      	</div>
      </div>
    );
  }
}
module.exports = Tasks;
