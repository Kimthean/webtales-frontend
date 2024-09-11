import formatRelativeTime from "@/lib/format-time";
import type { Novel } from "@/types/novel";

interface NovelCardProps {
  novel: Novel;
  isLatestUpdate: boolean;
}

function formatTitle(title: string): string {
  return title.replace(/\b\w/g, (char: string) => char.toUpperCase());
}

function formatAuthor(author: string): string {
  return author
    ? author
        .replace(/[_-]/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Unknown";
}

const NovelCard = ({ novel, isLatestUpdate }: NovelCardProps) => {
  return (
    <a
      href={`/novel/${novel.slug}`}
      className="relative block overflow-hidden rounded-xl bg-skin-card bg-opacity-60 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row">
        {novel.thumbnail && (
          <img
            className="mx-auto h-full w-44 min-w-48 object-contain max-sm:max-h-72 sm:h-auto sm:w-48 sm:object-cover"
            src={novel.thumbnail}
            alt={novel.title}
          />
        )}
        <div className="flex flex-grow flex-col justify-between p-4">
          <div className="flex-grow">
            <h2 className="text-sm font-bold text-skin-base sm:mb-2 sm:text-xl">
              {formatTitle(novel.title)}
            </h2>
            <p className="mb-1 text-xs italic text-skin-base opacity-70 sm:mb-4 sm:text-sm">
              {novel.raw_title}
            </p>
            <div className="relative">
              <p className="line-clamp-3 text-xs text-skin-base sm:line-clamp-4 sm:text-sm">
                {novel.description}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-xs text-skin-base">
            <div>
              <span className="font-semibold">Author:</span>{" "}
              {formatAuthor(novel.author)}
            </div>
            <div>
              <span className="font-semibold">Chapters:</span>{" "}
              {novel.total_chapters_count}
            </div>
            <div>
              <span className="font-semibold">
                {isLatestUpdate ? "Last Updated:" : "Added:"}
              </span>{" "}
              {formatRelativeTime(
                isLatestUpdate ? novel.last_chapter_date : novel.created_at
              )}
            </div>
            {novel.translation_status === "in_progress" && (
              <div className="col-span-2 sm:col-span-3">
                <span className="font-semibold">Status:</span>
                <span className="rounded-full">Translating</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NovelCard;
