import type { APIRoute } from "astro";
import { API_URL } from "@/constants/index";

export const GET: APIRoute = async ({ params }) => {
  const { id, number } = params;

  try {
    const response = await fetch(`${API_URL}/novel/${id}/chapter/${number}`);

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

    const nextChapter = parseInt(number!) + 1;
    const nextChapterResponse = await fetch(
      `${API_URL}/novel/${id}/chapter/${nextChapter}`
    );
    const hasNextChapter = nextChapterResponse.ok;

    return new Response(
      JSON.stringify({
        ...chapterData,
        nextChapter: hasNextChapter ? nextChapter : null,
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
