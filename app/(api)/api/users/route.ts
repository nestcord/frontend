import { db } from "@/controllers/client/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  try {
    // Realizar la búsqueda en la tabla 'users'
    const { data, error } = await db
      .from("users")
      .select("user_name")
      .or(`user_name.ilike.%${query}%,name.ilike.%${query}%`) // Búsqueda por 'user_name' o 'name'
      .limit(10); // Limita el número de resultados para mejorar el rendimiento

    // Manejo de errores de la consulta
    if (error) {
      return Response.json(
        { error: error.message || "Database query error" },
        { status: 500 },
      );
    }


    // Retorno exitoso
    return Response.json({ users: data }, { status: 200 });
  } catch (error) {
    // Captura de errores generales
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
