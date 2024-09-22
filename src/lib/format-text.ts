export const formatAuthor = (author: string) => {
  return author
    ? author
        .replace(/[_-]/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Unknown";
};

export const formatTitle = (title: string) => {
  return title.replace(/\b\w/g, (char: string) => char.toUpperCase());
};
