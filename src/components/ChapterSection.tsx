import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Pagination from "./Pagination";
import { API_URL } from "../constants/index";
import "@styles/scrollbar.css";
import formatRelativeTime from "@lib/formatRelativeTime";

interface Chapter {
  translated_title: string;
  Number: string;
  UpdatedAt: string;
}

interface ChapterSectionProps {
  id: string | undefined;
  initialPage: number;
  pageSize: number;
}

const LoadingSpinner = () => (
  <div class="flex h-full items-center justify-center">
    <div class="h-12 w-12 animate-spin rounded-full border-4 border-skin-accent border-t-transparent"></div>
  </div>
);

const ChapterSection = ({ id, initialPage, pageSize }: ChapterSectionProps) => {
  const [page, setPage] = useState(initialPage);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChapters();
  }, [page, id, pageSize]);

  const fetchChapters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}/novels/${id}/paginate-chapters?page=${page}&pageSize=${pageSize}`
      );
      if (res.ok) {
        const data = await res.json();
        setChapters(data.chapters);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (e) {
      setError("Failed to fetch chapters. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div class="mx-auto w-full max-w-3xl rounded-lg bg-skin-card p-4 shadow-md sm:p-6">
      <h2 class="mb-4 text-xl font-semibold text-skin-base sm:text-2xl">
        Chapters
      </h2>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {error && <p class="text-red-500">{error}</p>}
      <div class="h-[500px] overflow-y-auto sm:h-[600px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {chapters.map((chapter: Chapter) => (
              <li
                key={chapter.Number}
                class="flex h-full w-full flex-col justify-between"
              >
                <a
                  href={`/novel/${id}/chapter/${chapter.Number}/`}
                  class="flex flex-grow flex-col rounded-md p-3 transition duration-150 ease-in-out hover:bg-skin-accent"
                >
                  <span class="text-sm font-medium text-skin-base sm:text-sm">
                    {chapter.translated_title}
                  </span>
                  <span class="mt-1 text-xs text-skin-base opacity-70">
                    Updated: {formatRelativeTime(chapter.UpdatedAt)}
                  </span>
                </a>
                <hr class="mt-2 border-skin-line" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChapterSection;
