import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  return new Response(JSON.stringify(session), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
