// TaskDashboard.jsx

import React, { useState, useEffect } from 'react';
import '../styles/Tasks.css';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'High',
    dueDate: '',
    reminder: false,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewTask({
      ...newTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', priority: 'High', dueDate: '', reminder: false });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
    });
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...newTask } : task
    ));
    setEditingTask(null);
    setNewTask({ title: '', priority: 'High', dueDate: '', reminder: false });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const checkReminders = () => {
    const now = new Date();
    const newNotifications = tasks
      .filter((task) => task.reminder && task.dueDate)
      .filter((task) => new Date(task.dueDate) <= now)
      .map((task) => ({
        message: `Reminder: ${task.title} is due!`,
        id: Date.now(),
      }));
    setNotifications([...notifications, ...newNotifications]);
  };

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const sendEmailNotification = (task) => {
    // Simulate sending an email (in reality, this would be a backend call)
    console.log(`Sending email notification for task: ${task.title}`);
    alert(`Email notification sent for task: ${task.title}`); // Simulate alert

    // In a real application, you would send an email to the user
    // using a backend service or API.
  };

  return (
    <div className="task-dashboard">
      <h1>Task Dashboard</h1>

      <div className="notifications">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">
              {notification.message}
              <button onClick={() => removeNotification(notification.id)}>X</button>
            </div>
          ))
        ) : (
          <p>No new notifications</p>
        )}
      </div>

      <div className="add-task">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Enter task"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <label>
          Reminder:
          <input
            type="checkbox"
            name="reminder"
            checked={newTask.reminder}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="task-lists">
        <div className="task-list">
          <h2>High Priority Tasks</h2>
          {tasks
            .filter((task) => task.priority === 'High')
            .map((task) => (
              <div key={task.id} className="task">
                <p>{task.title}</p>
                <p>Due: {task.dueDate}</p>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => sendEmailNotification(task)}>Email</button> {/* Add email button */}
              </div>
            ))}
        </div>

        <div className="task-list">
          <h2>Medium Priority Tasks</h2>
          {tasks
            .filter((task) => task.priority === 'Medium')
            .map((task) => (
              <div key={task.id} className="task">
                <p>{task.title}</p>
                <p>Due: {task.dueDate}</p>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => sendEmailNotification(task)}>Email</button> {/* Add email button */}
              </div>
            ))}
        </div>

        <div className="task-list">
          <h2>Low Priority Tasks</h2>
          {tasks
            .filter((task) => task.priority === 'Low')
            .map((task) => (
              <div key={task.id} className="task">
                <p>{task.title}</p>
                <p>Due: {task.dueDate}</p>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => sendEmailNotification(task)}>Email</button> {/* Add email button */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;