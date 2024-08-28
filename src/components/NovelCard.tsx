import type { Novel } from "./Search";

interface NovelCardProps {
  novel: Novel;
}

const NovelCard = ({ novel }: NovelCardProps) => {
  return (
    <a
      href={`/novel/${novel.ID}`}
      className="relative block overflow-hidden rounded-xl bg-skin-card shadow-lg transition-all duration-300 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
    >
      <div className="flex flex-col sm:flex-row">
        {novel.thumbnail && (
          <img
            className="h-48 w-full min-w-48 object-contain sm:h-auto sm:w-48"
            src={novel.thumbnail}
            alt={novel.title}
            width={200}
            height={200}
          />
        )}
        <div className="flex flex-grow flex-col justify-between p-4">
          <div className="flex-grow">
            <h2 className="mb-2 font-bold text-skin-base sm:text-xl">
              {novel.title}
            </h2>
            <div className="relative">
              <p className="line-clamp-3 text-sm text-skin-base sm:line-clamp-4">
                {novel.description}
              </p>
            </div>
          </div>
          <p className="items-center text-xs text-skin-base opacity-80 max-sm:pt-4 sm:pb-2">
            {novel.total_chapters_count} Chapters
          </p>
          <p className="text-sm text-skin-base opacity-80 sm:mt-auto">
            Author: {novel.author}
          </p>
        </div>
      </div>
    </a>
  );
};

export default NovelCard;
