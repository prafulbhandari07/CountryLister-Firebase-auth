import React from "react";

export default function Pagination({ currentPage, setCurrentPage, lastPage }) {
  function handleNext() {
    if (currentPage >= lastPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  }
  function handlePrev() {
    if (currentPage < 2) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  }
  function goToFirst() {
    setCurrentPage(1);
  }
  function goToLast() {
    setCurrentPage(lastPage);
  }
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 0",
        gap: "8px",
      }}
    >
      <button
        style={{
          width: "80px",
        }}
        onClick={goToFirst}
      >
        {"<<"}
      </button>
      <button
        style={{
          width: "80px",
        }}
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <input
        style={{
          width: "50px",
        }}
        min={1}
        type="number"
        value={currentPage}
        onChange={(e) => setCurrentPage(+e.target.value)}
      />
      <button
        style={{
          width: "80px",
        }}
        onClick={handleNext}
      >
        {">"}
      </button>
      <button
        style={{
          width: "80px",
        }}
        onClick={goToLast}
      >
        {">>"}
      </button>
    </div>
  );
}
