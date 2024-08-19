import toast from 'react-hot-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlices';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/tasks`;
function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      // call to backend using axios or fetch api
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
    
  };

  const handleDelete = async () => {
    // call to backend using axios or fetch api
    dispatch(deleteTodo(todo.id));
    try {
           
        const response = await axios.delete(`${API_URL}/${todo.id}`, todo);
         console.log('Todo deleted successfully:', response.data);
         toast.success('Todo Deleted Successfully');
         return response.data;  
       } catch (error) {
         console.error('There was an error updating the todo:', error);
         throw error; // Rethrow the error to handle it in the calling function
       }

  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.text}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>

            <p className={styles.time}>{todo.dueDate}</p>
            <p className={styles.todoText}>{todo.priority}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}
export default TodoItem;
