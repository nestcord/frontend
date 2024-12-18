"use server";

import { cookies } from "next/headers";

export async function create(userId: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "user_id_cadche",
    value: userId,
    httpOnly: true,
    path: "/",
  });
}
