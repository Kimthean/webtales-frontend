import { h } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScrollChapterContent from "./InfiniteScrollChapterContent";

interface InfiniteScrollChapterProps {
  novelId: string;
  initialChapterNumber: string;
}

export const InfiniteScrollChapter = (props: InfiniteScrollChapterProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <InfiniteScrollChapterContent {...props} />
    </QueryClientProvider>
  );
};
