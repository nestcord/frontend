import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/controllers/client/server";

export async function GET(request: NextRequest) {
  const db = await createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { data } = await db.from("users").select("*").eq("id", id);

  
  if (data === null)
    return NextResponse.json({
      message: "User not found with the provided ID",
      status: 404,
    });

  return NextResponse.json({
    message: "User found with the provided ID",
    status: 200,
    data,
  });
}
