import { createClient } from "@/controllers/client/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10; // Número de publicaciones por página
    const offset = Math.max((page - 1) * limit, 0);

    const db = await createClient();
    const { data: posts, error } = await db
      .from("status")
      .select(
        "id, content, user:users(name, user_name, avatar_url, id), likes, comments, views, created_at, attachment",
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching posts:", error);
      return new Response(JSON.stringify({ error: "Error fetching posts" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ posts }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
