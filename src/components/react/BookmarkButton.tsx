import { useState } from "react";
import axiosInstance from "@/lib/axios";

interface BookmarkButtonProps {
  novelId: string;
  status: boolean | null;
}

const BookmarkButton = ({ novelId, status }: BookmarkButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(status);

  const handleToggleBookmark = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        const res = await axiosInstance.delete(`/user/bookmark/${novelId}`);
        if (res.status === 200) setIsBookmarked(false);
      } else {
        const res = await axiosInstance.post(`/user/bookmark/${novelId}`);
        if (res.status === 200) setIsBookmarked(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderButtonContent = () => {
    if (isBookmarked === null) {
      return "Login to Bookmark";
    } else if (isBookmarked === true) {
      return loading ? "Removing..." : "Bookmarked";
    } else {
      return loading ? "Adding..." : "Add to Bookmark";
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className="hover:bg-skin-accent-hover rounded-md bg-skin-accent px-3 py-1 text-xs text-skin-inverted transition sm:px-5 sm:py-2 sm:text-sm"
      disabled={loading || isBookmarked === null}
    >
      {renderButtonContent()}
    </button>
  );
};

export default BookmarkButton;
