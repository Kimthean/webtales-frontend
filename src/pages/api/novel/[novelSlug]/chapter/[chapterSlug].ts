import type { APIRoute } from "astro";
import { API_URL } from "@/constants/index";

export const GET: APIRoute = async ({ params }) => {
  const { novelSlug, chapterSlug } = params;

  try {
    const response = await fetch(
      `${API_URL}/novel/${novelSlug}/chapter/${chapterSlug}`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch chapter" }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const chapterData = await response.json();

    const nextChapterSlug = chapterData.next_chapter_slug;
    const nextChapterResponse = await fetch(
      `${API_URL}/novel/${novelSlug}/chapter/${nextChapterSlug}`
    );
    const hasNextChapter = nextChapterResponse.ok;

    return new Response(
      JSON.stringify({
        ...chapterData,
        nextChapter: hasNextChapter ? nextChapterSlug : null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
