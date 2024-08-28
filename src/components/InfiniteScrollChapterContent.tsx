import { useEffect, useRef, useCallback } from "preact/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "./Loading";

interface Chapter {
  id: number;
  translated_title: string;
  translated_content: string;
  chapter_number: number;
}

interface InfiniteScrollChapterProps {
  novelId: string;
  initialChapter: Chapter;
  initialChapterNumber: string;
}

const fetchChapter = async ({
  pageParam,
  novelId,
}: {
  pageParam: number;
  novelId: string;
}) => {
  const response = await fetch(`/api/novel/${novelId}/chapter/${pageParam}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const InfiniteScrollChapterContent: preact.FunctionComponent<
  InfiniteScrollChapterProps
> = ({ novelId, initialChapterNumber }) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["chapters", novelId],
    queryFn: ({ pageParam }) => fetchChapter({ pageParam, novelId }),
    initialPageParam: parseInt(initialChapterNumber),
    getNextPageParam: lastPage => {
      const nextChapterNumber = lastPage.nextChapter;
      if (nextChapterNumber) {
        const newUrl = `/novel/${novelId}/chapter/${nextChapterNumber - 1}`;
        history.replaceState({}, "", newUrl);
      }
      return nextChapterNumber;
    },
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const progress = document.getElementById("progress-container");
    progress?.style.setProperty("display", "none");
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {data?.pages.map((chapter, i) => (
        <div
          key={i}
          className="chapter-content mb-8 space-y-4"
          data-chapter-number={chapter.chapter_number}
        >
          <h2 className="text-2xl font-bold">{chapter.translated_title}</h2>
          {chapter.translated_content
            .split("\n\n")
            .filter((paragraph: string) => paragraph.trim() !== "")
            .map((paragraph: string) => (
              <p className="overflow-x-hidden text-pretty leading-relaxed">
                {paragraph}
              </p>
            ))}
        </div>
      ))}
      <div ref={observerTarget}>
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : hasNextPage ? (
          "Load More"
        ) : (
          "No more chapters"
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollChapterContent;
