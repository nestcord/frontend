"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/controllers/client/client";
import { UserTypes } from "@/controllers/client/useClient";

export const addPost = async (
  formData: FormData,
  attachmentUrl: string | null,
  user: UserTypes["user"] // Pasar el usuario como argumento
) => {
  const content = formData.get("content") as string;

  const postData = {
    content: content,
    user_id: user.id,
    attachment: attachmentUrl || undefined, // Asignar solo si existe
  };

  // Inserta el post en la base de datos
  try {
    const { error } = await db.from("posts").insert([postData]);
  } catch (error) {
      console.error("Error inserting post:", error);
  }
};