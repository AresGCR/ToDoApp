import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlices';
import { addTodo as apiAdd } from '../api/AddTodo';
import { updateTodo as apiUpdate } from '../api/UpdateTodo';
const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/tasks`;
function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority]=useState('');
  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);
  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const generateNumericId = () => {
    // Generate a random number between 1 and 9999 (adjust range as needed)
    return Math.floor(Math.random() * 9999) + 1;
  };
  const newTodo = {
    id: uuid(),
    title,
    status,
    time: new Date().toISOString().split('T')[0],
    dueDate: formatDate(dueDate),
    priority: priority || 'MEDIUM', // Use single quotes
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        const newTodo = {
            id: generateNumericId(), // Integer ID based on the current timestamp
            text: title, // Change "title" to "text"
            dueDate: formatDate(dueDate), // Formatted due date
            status, // Use the selected status
            doneDate: '', // Set doneDate to an empty string initially
            priority, // Use the selected priority
            creationDate: new Date().toISOString().split('T')[0], // Creation date in "YYYY-MM-DD" format
          };
         dispatch(addTodo(newTodo));
        await apiAdd(newTodo);
    }
      if (type === 'update') {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.dueDate !== dueDate ||
          todo.priority != priority
        ) {
          // call to backend axios or fetch
      
          dispatch(updateTodo({ ...todo, title, status,dueDate,priority}));
          const updatedTodo = {
            ...todo,
            text: title,
            status,
            dueDate: formatDate(dueDate),
            priority,
          };
          //await apiUpdate(updatedTodo); 
          try {
           
           const response = await axios.put(`${API_URL}`, updatedTodo);
            
            console.log('Todo updated successfully:', response.data);
            return response.data;  
          } catch (error) {
            console.error('There was an error updating the todo:', error);
            throw error; // Rethrow the error to handle it in the calling function
          }
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {' '}
              {type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <label htmlFor="dueDate">
              Due Date
              <input
                type="date" // Change the input type to "date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)} // Update the state for due date
              />
            </label>
            <label htmlFor="priority">
              Priority
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </label>

            <div classsName={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === 'update' ? 'Update' : 'Add'} Task
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
    // </div>
  );
}

export default TodoModal;
