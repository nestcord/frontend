import { db } from "@/controllers/client/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    console.error("User ID is missing in the request");
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { data: posts, error } = await db
      .from("posts")
      .select("*, user:users(name, user_name, avatar_url), attachment")
      .order("created_at", { ascending: false })
      .eq("user.user_name", id)
      .limit(5);

    if (error) {
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (e: any) {
    console.error("Unexpected error:", e.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
