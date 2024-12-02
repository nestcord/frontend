import { db } from "@/controllers/client/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 5);
  const limit = 10; // Número de publicaciones por página
  const offset = (page - 1) * limit;

  const { data: posts, error } = await db
  .from("posts")
  .select("id, content, user:users(name, user_name, avatar_url), likes, created_at, attachment")
  .order("created_at", { ascending: false })
  .range(offset, offset + limit - 1);

  if (error) {
    console.error(error.name, error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch posts" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ posts }), { status: 200 });
}
