import { useEffect } from "react";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";

export default function PaginationControls({
  currPage,
  totalPages,
  handlePagination,
}) {
  useEffect(() => {
    console.log(currPage);
  }, [currPage]);

  const pagesShown = 5;

  const renderPageNumbers = () => {
    const pagNumbers = [];

    for (let i = currPage; i <= totalPages; i++) {
      pagNumbers.push(i);
      if (pagNumbers.length === pagesShown) {
        break;
      }
    }

    return pagNumbers.map((num) => (
      <button
        key={num}
        onClick={() => handlePagination(num)}
        className={`w-8 aspect-square text-center pt-0.5 rounded-full ${
          currPage === num ? "font-semibold bg-c-orentua text-white" : ""
        }`}
      >
        {num}
      </button>
    ));
  };

  return (
    <>
      <div className="flex items-center justify-center mt-5 text-birdong">
        <button
          disabled={currPage === 1}
          onClick={() => handlePagination(currPage - 1)}
          className="disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <NavigateBefore style={{ fontSize: "32px" }}></NavigateBefore>
        </button>

        <div className="flex gap-2">{renderPageNumbers()}</div>

        <button
          disabled={currPage === totalPages}
          onClick={() => handlePagination(currPage + 1)}
          className="disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <NavigateNext style={{ fontSize: "32px" }}></NavigateNext>
        </button>
      </div>
      <p className="text-center font-medium mt-2">
        Total halaman: {totalPages}
      </p>
    </>
  );
}
