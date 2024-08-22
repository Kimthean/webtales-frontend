export type Novel = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  title: string;
  raw_title: string;
  thumbnail: string;
  author: string;
  description: string;
  url: string;
  chapters: string | null;
  epub_url: null;
  tags: null;
  genres: null;
};
