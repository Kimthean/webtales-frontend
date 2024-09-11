import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "./Loading";

interface Chapter {
  id: number;
  translated_title: string;
  translated_content: string;
  slug: string;
}

interface InfiniteScrollChapterProps {
  novelSlug: string;
  initialChapter: Chapter;
  initialChapterSlug: string;
}

const fetchChapter = async ({
  pageParam,
  novelSlug,
}: {
  pageParam: string;
  novelSlug: string;
}) => {
  const response = await fetch(`/api/novel/${novelSlug}/chapter/${pageParam}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const InfiniteScrollChapterContent: preact.FunctionComponent<
  InfiniteScrollChapterProps
> = ({ novelSlug, initialChapterSlug }) => {
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
    queryKey: ["chapters", novelSlug],
    queryFn: ({ pageParam }) => fetchChapter({ pageParam, novelSlug }),
    initialPageParam: initialChapterSlug,
    getNextPageParam: lastPage => {
      const nextChapterSlug = lastPage.nextChapter;
      if (nextChapterSlug) {
        const newUrl = `/novel/${novelSlug}/chapter/${nextChapterSlug}`;
        history.replaceState({}, "", newUrl);
      }
      return nextChapterSlug;
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
          data-chapter-slug={chapter.slug}
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
