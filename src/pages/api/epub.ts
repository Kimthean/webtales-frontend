import { API_URL } from "@/constants/index";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  try {
    const res = await fetch(`${API_URL}/novel/convert-epub/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to convert epub" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
