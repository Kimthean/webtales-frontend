import type { APIRoute } from "astro";
import { API_URL } from "../../constants/index";

export const GET: APIRoute = async ({ request, params }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const page = url.searchParams.get("page");
  const pageSize = url.searchParams.get("pageSize");

  if (!id || !page || !pageSize) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(
      `${API_URL}/novels/${id}/paginate-chapters?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch chapters" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
