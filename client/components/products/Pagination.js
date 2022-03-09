import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  path,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "selected" : ""}>
            <a
              onClick={() => {
                paginate(number);
              }}
              href={
                path === "a-z"
                  ? "#/products/sorted/a-z"
                  : path === "low-high"
                  ? "#/products/sorted/price/low-high"
                  : path === "high-low"
                  ? "#/products/sorted/price/high-low"
                  : "#/"
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
