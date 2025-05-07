// task-app/frontend/App.js 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(err => console.error("Error fetching tasks", err));
  }, []);

  const addTask = () => {
    if (taskInput) {
      axios.post('http://localhost:5000/tasks', { task: taskInput })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTaskInput('');
        })
        .catch(err => console.error("Error adding task", err));
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(err => console.error("Error deleting task", err));
  };

  return (
    <div className="task-container">
      <h1>Task List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.task} 
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
