import React from "react";
import styles from "../css/Pagination.module.css"
import { useSelector } from "react-redux";

const Pagination = ({ dogsPerPage, dogs, pagination }) => {
    const pageNumbers = [];

    const currentPage= useSelector(state=> state.currentPage)

    for (let i = 1; i <= Math.floor(dogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

return (
  <nav className={styles.numbersPagination}>
    <ul className={styles.pagesPagination}>
      {pageNumbers.map((num) => (
        <li key={num}>
          <a className={styles.numButtonPagination} onClick={() => pagination(num)}>
            {num}
          </a>
        </li>
      ))}
      {pageNumbers.length === 0 && (
        <li>
          <a className={styles.numButtonPagination} onClick={() => pagination(1)}>
            1
          </a>
        </li>
      )}
    </ul>
  </nav>
);
}

export default Pagination;