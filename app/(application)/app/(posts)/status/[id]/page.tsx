import { db } from "@/controllers/client/client";
import { notFound } from "next/navigation";

export default async function Status({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const statusId = (await params).id;

  try {
    const { data: post, error } = await db
      .from("posts")
      .select("*")
      .eq("id", statusId)
      .single();

    // Si no existe el post, redirige a un 404
    if (error || !post) {
      notFound();
    }

    // Si el post existe, renderiza el contenido
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound(); // En caso de error en la consulta, redirige a un 404
  }
}
