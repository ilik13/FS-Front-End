module.exports = {
  fetchTasks: {
    path: '/api/v001/tasks',
    method: 'GET',
  },

  fetchTask: {
    path: '/api/v001/tasks/:id',
    method: 'GET',
  },

  addTask: {
    path: '/api/v001/tasks',
    method: 'POST',
  },

  updateTask: {
    path: '/api/v001/tasks/:id',
    method: 'PATCH',
  },

  deleteTask: {
    path: '/api/v001/tasks/:id',
    method: 'DELETE',
  },
};
