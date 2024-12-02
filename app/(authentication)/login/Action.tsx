"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { createClient } from "@/controllers/client/client";

// Función para obtener el usuario de Supabase
async function fetchUser() {
  const { data } = await createClient.auth.getUser();

  return data?.user || null; // Asegúrate de que devuelve null si no hay usuario
}

export default function LoginButton() {
  const { data: user, isLoading } = useSWR("user", fetchUser);

  // Manejo del estado de carga
  if (isLoading) {
    return null;
  }

  return (
    <Link href={user ? "/app" : "/login"} passHref>
      <Button
        size="lg"
        className="bg-white hover:bg-white hover:text-indigo-600 text-black font-semibold w-full max-w-xs transition-all duration-200 rounded-full"
      >
        {user ? "Open App" : "Log In"}
      </Button>
    </Link>
  );
}
