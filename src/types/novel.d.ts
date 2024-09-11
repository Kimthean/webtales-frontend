export type Novel = {
  id: number;
  created_at: string;
  updatet_at: string;
  slug: string;
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
  total_chapters_count?: string;
  last_chapter_date: string;
  translation_status?: string;
};
