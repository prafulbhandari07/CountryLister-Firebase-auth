import React from "react";

export default function Pagination({ lastPage, currentPage, setCurrentPage }) {
  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 1;
    } else if (value < 1) {
      value = 1;
    } else if (value > lastPage) {
      value = lastPage;
    }
    setCurrentPage(value);
  };

  return (
    <div id="paginationContainer">
      <button
        style={{ width: "80px" }}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        <p>
          {currentPage} of {lastPage}
        </p>
      </span>
      <button style={{ width: "80px" }}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
}
