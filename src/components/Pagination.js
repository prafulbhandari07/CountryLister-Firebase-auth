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
      <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <p>Page</p>
        <input
          style={{
            width: "50px",
            paddingLeft: "10px",
            marginRight: "10px",
          }}
          min={1}
          max={lastPage}
          type="number"
          value={currentPage}
          onChange={handleInputChange}
          aria-label="Current Page"
        />
        <p>of</p>
        <input
          style={{
            width: "50px",
            paddingLeft: "10px",
            marginRight: "10px",
          }}
          min={1}
          value={lastPage}
          aria-label="Total Pages"
          readOnly
        />
      </span>
      <button
        style={{ width: "80px" }}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
}
