'use server';
import { revalidatePath } from 'next/cache'

import { createClient } from "@/controllers/client/server";
import { UserPropierties } from "types/User";

export const addPost = async (
  formData: FormData,
  attachmentUrl: string | null,
  user: UserPropierties,
) => {

  const db = await createClient();
  const content = formData.get("content") as string;

  const postData = {
    content: content,
    user_id: user.id,
    attachment: attachmentUrl || undefined,
  };

  // Insert status into the database
  await db.from("posts").insert([postData]);
  revalidatePath('/app')
};
