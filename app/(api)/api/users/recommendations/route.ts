import { db } from "@/controllers/client/client";
import { useClient, UserTypes } from "@/controllers/client/useClient";
import { NextResponse } from "next/server";

const NUM_RECOMMENDATIONS = 5;

export async function GET(request: Request) {
  const data = await useClient();
  let user: UserTypes["user"] = data.user;

  const { data: recommendations, error: queryError } = await db
    .from("users")
    .select("id, user_name, name, avatar_url")
    .neq("id", user.id)
    .order("id", { ascending: false }) // Cambia 'id' por otro campo si es necesario
    .limit(NUM_RECOMMENDATIONS);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json({ recommendations });
}
