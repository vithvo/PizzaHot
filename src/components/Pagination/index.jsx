import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

export default function Pagination({ onChangePage, currentPage }) {
  return (
    <ReactPaginate
      containerClassName={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}
