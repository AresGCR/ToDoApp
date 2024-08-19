import React from 'react';
import styles from '../styles/modules/pagination.module.scss'; // Add CSS for pagination
import Button from './Button';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  // Calculate the total number of pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination__list}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pagination__item}>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault(); // Prevent default behavior of anchor
                paginate(number); // Change the page
              }}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
