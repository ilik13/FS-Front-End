const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
const { Route, Link } = require('react-router-dom');
const Tasks = require('tasks/tasks.jsx');
const About = require('about/about.jsx');

const Main = () => (
  <Router>
    <div className="main">
      <Route path="/" exact component={Tasks} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

module.exports = Main;
