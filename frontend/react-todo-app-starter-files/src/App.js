import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import styles from './styles/modules/app.module.scss';
import PageTitle from './components/PageTitle';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import Pagination from './components/Pagination'; 
import AvgTime from './components/AvgTime';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const todoList = useSelector((state) => state.todo.todoList); // Access todoList from redux store

  // Calculate indexes for slicing
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // Slice the todoList to get only the items for the current page
  const currentPosts = todoList.slice(firstPostIndex, lastPostIndex);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="container">
        <PageTitle>ToDo List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent todos={currentPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={todoList.length}
            paginate={paginate}
          />
          <AvgTime /> 
        </div>
      </div>
     
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}
export default App;
