import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createClient } from "@/controllers/client/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const path = request.nextUrl.searchParams.get("path"); // Ruta a revalidar, pasada como parámetro en la solicitud

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID del post no proporcionado" },
      { status: 400 },
    );
  }

  const db = await createClient();

  // Eliminar el post de la base de datos
  const { error } = await db.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar el post:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar el post" },
      { status: 500 },
    );
  }

  // Revalidar la ruta si se proporciona
  if (path) {
    try {
      revalidatePath(path); // Invalida la caché de la ruta específica
    } catch (err) {
      console.error("Error al revalidar la ruta:", err);
      return NextResponse.json(
        { success: false, message: "Error al revalidar la ruta" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true });
}
