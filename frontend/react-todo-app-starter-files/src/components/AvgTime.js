
import React from 'react';
import { useSelector } from 'react-redux';


const calculateTimeDifferenceInDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};


const calculateAverageTime = (tasks) => {
  const completedTasks = tasks.filter((task) => task.doneDate);
  if (completedTasks.length === 0) return 0;

  const totalDays = completedTasks.reduce(
    (sum, task) =>
      sum + calculateTimeDifferenceInDays(task.creationDate, task.doneDate),
    0
  );

  return totalDays / completedTasks.length;
};


const calculateAverageTimeByPriority = (tasks) => {
  const priorities = ['HIGH', 'MEDIUM', 'LOW'];
  const averageByPriority = {};

  priorities.forEach((priority) => {
    const tasksByPriority = tasks.filter((task) => task.priority === priority);
    averageByPriority[priority] = calculateAverageTime(tasksByPriority);
  });

  return averageByPriority;
};

const AvgTime = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  
  const generalAverage = calculateAverageTime(todoList);
  const averageByPriority = calculateAverageTimeByPriority(todoList);

  return (
    <div>
      <h2>Average Time Between Creation and Completion</h2>
      <p>General Average: {generalAverage.toFixed(2)} days</p>
      <h3>By Priority:</h3>
      <ul>
        {Object.keys(averageByPriority).map((priority) => (
          <li key={priority}>
            {priority}: {averageByPriority[priority].toFixed(2)} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvgTime;

