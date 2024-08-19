import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
const sortByPriority = (todoList) => {
  const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  return [...todoList].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};
function AppContent({ todos }) { // Accept todos prop
  let filteredTodoList = todos;
  
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  if (filterStatus === 'priority') {
    // Sort tasks by priority if filter status is 'Priority'
    filteredTodoList = sortByPriority(filteredTodoList);
  } else {
    // Filter tasks by status
    filteredTodoList = filteredTodoList.filter((item) => {
      if (filterStatus === 'all') {
        return true;
      }
      return item.status === filterStatus;
    });
  }

  return (
    <div className={styles.content__wrapper}>
      {filteredTodoList && filteredTodoList.length > 0
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No tasks found'}
    </div>
  );
}

export default AppContent;