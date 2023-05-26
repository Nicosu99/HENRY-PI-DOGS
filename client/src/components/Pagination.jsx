import React from "react";
import styles from "../css/Pagination.module.css"

const Pagination = ({ dogsPerPage, dogs, pagination }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.floor(dogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={styles.numbersPagination}>
          <ul className={styles.pagesPagination}>
            {pageNumbers &&
              pageNumbers.map((num) => (
                <li key={num}>
                  <a className={styles.numButtonPagination} onClick={() => pagination(num)}>
                    {num}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      );
}

export default Pagination;