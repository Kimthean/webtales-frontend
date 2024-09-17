import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "@/styles/scrollbar.css";
import formatRelativeTime from "@/lib/format-time";
import LoadingSpinner from "./Loading";

interface Chapter {
  translated_title: string;
  slug: string;
  number: string;
  updated_at: string;
}

interface ChapterListProps {
  novelSlug: string | undefined;
  initialPage: number;
  pageSize: number;
}

const ChapterList = ({
  novelSlug,
  initialPage,
  pageSize,
}: ChapterListProps) => {
  const [page, setPage] = useState(initialPage);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChapters();
  }, [page, novelSlug, pageSize]);

  const fetchChapters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/chapter?novelSlug=${novelSlug}&page=${page}&pageSize=${pageSize}`
      );
      if (res.ok) {
        const data = await res.json();
        setChapters(data.chapters);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to fetch chapters. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-skin-card p-4 sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-skin-base sm:text-2xl">
        Chapters
      </h2>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="h-[500px] overflow-y-auto sm:h-[600px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            {chapters.map((chapter: Chapter) => (
              <li
                key={chapter.number}
                className="flex h-full w-full flex-col justify-between"
              >
                <a
                  href={`/novel/${novelSlug}/chapter/${chapter.slug}`}
                  className="flex flex-grow flex-col rounded-md p-3 transition duration-150 ease-in-out hover:bg-skin-accent"
                >
                  <span className="text-xs font-medium text-skin-base sm:text-sm">
                    {chapter.translated_title}
                  </span>
                  <span className="mt-1 text-xs text-skin-base opacity-70">
                    Updated: {formatRelativeTime(chapter.updated_at)}
                  </span>
                </a>
                <hr className="mt-2 border-skin-line" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
