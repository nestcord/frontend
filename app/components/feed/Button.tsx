"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";


interface ComposePostButtonProps {
  content: string;
  attachment?: string | null; // Asegúrate de que attachment pueda ser string o null
}

export function ComposePostButton({
  content,
  attachment,
}: ComposePostButtonProps) {
  const { pending } = useFormStatus();

  // El botón se habilitará si hay contenido o un attachment
  const isButtonDisabled = pending || (content.length === 0 && !attachment);


  return (
    <Button
      disabled={isButtonDisabled}
      type="submit"
      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-1 text-sm font-bold"
    >
      {pending ? "Publishing..." : "Publish"}
    </Button>
  );
}
