import React, { useState } from 'react';
import './App.css';
import EggPriceChart from './components/EggPriceChart';
import PricePredictionGame from './components/PricePredictionGame';

function App() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Egg-onomics</h1>
        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
        <EggPriceChart />
        <PricePredictionGame />
      </div>
    </div>
  );
}

export default App;