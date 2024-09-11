import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import "@/styles/scrollbar.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [open, setOpen] = useState(false);

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const showPages = 4;
    const halfShowPages = Math.floor(showPages / 2);

    let startPage = Math.max(1, currentPage - halfShowPages);
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("popover");
      pageNumbers.push(totalPages);
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const renderPopover = () => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 py-1">
          <span>Page: {currentPage}</span>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 flex-col justify-center border-0 bg-skin-fill p-0">
        <div className="h-64 overflow-y-auto">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <div>
              <Button
                key={pageNum}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onPageChange(pageNum);
                  setOpen(false);
                }}
              >
                Page {pageNum}
              </Button>
              <hr className="bg-white" />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <nav
      className="mt-auto flex flex-wrap items-center justify-center"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${currentPage === 1 ? "text-gray-400" : "text-current"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
        </svg>
        <span className="ml-1 hidden sm:inline">Prev</span>
      </button>
      <div className="mx-2 my-2 flex flex-wrap justify-center space-x-2">
        {pageNumbers.map((pageNum, index) =>
          pageNum === "popover" ? (
            renderPopover()
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(pageNum as number)}
              className={`hidden rounded px-3 py-1 text-base sm:block ${currentPage === pageNum ? "bg-skin-accent text-skin-inverted" : ""}`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        aria-label="Next"
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${currentPage === totalPages ? "text-gray-400" : "text-current"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
