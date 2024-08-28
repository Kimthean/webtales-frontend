import { useState, useRef, useEffect } from "preact/hooks";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      pageNumbers.push("dropdown");
      pageNumbers.push(totalPages);
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const renderDropdown = (start: number, end: number) => (
    <div class="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        class="flex items-center px-2 py-1 text-base"
      >
        <span>Page: {currentPage}</span>
        <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div class="absolute right-0 mt-2 h-64 w-40 origin-top-right overflow-y-auto rounded-md bg-skin-fill shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              pageNum => (
                <button
                  key={pageNum}
                  onClick={() => {
                    onPageChange(pageNum);
                    setIsDropdownOpen(false);
                  }}
                  class="block w-full px-4 py-2 text-left text-sm text-skin-base hover:bg-skin-accent"
                  role="menuitem"
                >
                  Page {pageNum}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav
      class="mb-8 mt-auto flex flex-wrap items-center justify-center"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        class={`flex items-center justify-center ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`h-6 w-6 ${currentPage === 1 ? "text-gray-400" : "text-current"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
        </svg>
        <span class="ml-1 hidden sm:inline">Prev</span>
      </button>
      <div class="mx-2 my-2 flex flex-wrap justify-center space-x-2">
        {pageNumbers.map((pageNum, index) =>
          pageNum === "dropdown" ? (
            renderDropdown(
              (pageNumbers[index - 1] as number) + 1,
              (pageNumbers[index + 1] as number) - 1
            )
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(pageNum as number)}
              class={`hidden rounded px-3 py-1 text-base sm:block ${currentPage === pageNum ? "bg-skin-accent text-skin-inverted" : ""}`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        class={`flex items-center justify-center ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        aria-label="Next"
      >
        <span class="mr-1 hidden sm:inline">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`h-6 w-6 ${currentPage === totalPages ? "text-gray-400" : "text-current"}`}
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
