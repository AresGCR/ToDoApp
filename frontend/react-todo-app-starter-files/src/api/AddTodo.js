import axios from 'axios';

// API URL
const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/tasks`;

// Function to add a new todo
export const addTodo = async (newTodo) => {
  // Log the request data for debugging purposes
  console.log('Sending request with data:', newTodo);

  try {
    // Make the POST request using the newTodo object
    const response = await axios.post(API_URL, newTodo);

    // Log the response data
    console.log('Todo added successfully:', response.data);

    // Return the response data if needed
    return response.data;
  } catch (error) {
    // Handle and log any errors that occur during the request
    console.error('Error adding todo:', error);
    throw error;
  }
};

export default addTodo;
