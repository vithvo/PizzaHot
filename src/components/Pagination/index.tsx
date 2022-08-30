import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type PaginationProps = { onChangePage: (number: number) => void; currentPage: number };

const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
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
    />
  );
};

export default Pagination;
