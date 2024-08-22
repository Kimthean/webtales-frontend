import { useState, useEffect, useRef } from "preact/hooks";

interface ChapterContentProps {
  initialChapterData: {
    id: string | undefined;
    number: number;
    title: string;
    content: string[];
    totalChapters: number;
    nextChapterUrl: string | null;
  };
}

export default function ChapterContent({
  initialChapterData,
}: ChapterContentProps) {
  const [chapterData, setChapterData] = useState(initialChapterData);
  const [content, setContent] = useState(initialChapterData.content);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFetchEnabled, setIsAutoFetchEnabled] = useState(false);
  const [nextChapterTitle, setNextChapterTitle] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAutoFetchEnabled(localStorage.getItem("autoFetchEnabled") === "true");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          isAutoFetchEnabled &&
          chapterData.nextChapterUrl
        ) {
          fetchNextChapter();
        }
      },
      { threshold: 0.5 } // Adjust this value as needed
    );

    if (contentRef.current) {
      observer.observe(contentRef.current.lastElementChild as Element);
    }

    return () => observer.disconnect();
  }, [content, isAutoFetchEnabled, chapterData.nextChapterUrl]);

  const fetchNextChapter = async () => {
    if (isLoading || !chapterData.nextChapterUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch(chapterData.nextChapterUrl);
      if (!response.ok) throw new Error("Failed to fetch next chapter");

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const nextChapterContent = Array.from(
        doc.querySelectorAll(".chapter-content p")
      ).map(p => p.textContent || "");
      const nextChapterTitle = doc.querySelector("h1")?.textContent || "";
      const nextNextChapterUrl =
        doc
          .querySelector('a[aria-label="Go to next chapter"]')
          ?.getAttribute("href") || null;

      setContent(prevContent => [...prevContent, ...nextChapterContent]);
      setChapterData(prevData => ({
        ...prevData,
        number: prevData.number + 1,
        title: nextChapterTitle,
        nextChapterUrl: nextNextChapterUrl,
      }));
      setNextChapterTitle(nextChapterTitle);

      // Update URL without reloading the page
      history.pushState(null, "", chapterData.nextChapterUrl);
    } catch (error) {
      console.error("Error fetching next chapter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 class="mb-6 text-xl font-bold sm:text-3xl">{chapterData.title}</h1>
      <div ref={contentRef} class="chapter-content mb-8 space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} class="overflow-x-hidden text-pretty leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {isLoading && (
        <div class="py-4 text-center">
          <p>Loading next chapter...</p>
        </div>
      )}
      {nextChapterTitle && (
        <div class="py-4 text-center">
          <p>Next Chapter: {nextChapterTitle}</p>
        </div>
      )}
    </div>
  );
}
