import axios from 'axios';

// Format the date in the desired format (YYYY-MM-DD)
const formatDate = (date) => {
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Base URL for API requests (replace with your actual API URL)
const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/tasks`;

/**
 * Function to update a todo item.
 * @param {Object} todo - The todo item with updated fields.
 * @param {number} todo.id - The ID of the todo item.
 * @param {string} todo.text - The updated title or text of the todo.
 * @param {string} todo.status - The updated status of the todo.
 * @param {string} todo.dueDate - The updated due date of the todo.
 * @param {string} todo.priority - The updated priority of the todo.
 * @param {string} todo.doneDate - The updated done date of the todo.
 * @param {string} todo.creationDate - The updated creation date of the todo.
 * @returns {Promise<Object>} - The updated todo item from the API response.
 */
export const updateTodo = async (todo) => {
  // Prepare the todo data for the update
  const updatedTodo = {
    ...todo,
    dueDate: formatDate(todo.dueDate), // Format the due date
    // Ensure you include all necessary fields
  };
  console.log(`${API_URL}/${todo.id}`);
  try {
    console.log(`${API_URL}/${todo.id}`);
  } catch (error) {
    console.error('There was an error updating the todo:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default updateTodo;

