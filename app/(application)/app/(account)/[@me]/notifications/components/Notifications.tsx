"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/controllers/client/client"; // Supabase client import
import { toast } from "@/hooks/use-toast";

interface NotificationItemProps {
  id: string; // Notification ID
  post_id: string;
  message: string;
  avatar_url?: string;
  created_at: string;
  read: boolean; // Read status
}

export function NotificationItem({
  id,
  post_id,
  message,
  avatar_url,
  created_at,
  read,
}: NotificationItemProps) {
  const [isRead, setIsRead] = useState(read);

  const markAsRead = async () => {
    try {
      // Actualizar el estado de 'read' en la base de datos
      const { error } = await db
        .from("notifications")
        .update({ read: true })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to mark notification as read.",
          variant: "destructive",
        });
        console.error("Failed to update notification:", error);
        return;
      }

      // Actualizar el estado local solo después de que la base de datos se haya actualizado
      setIsRead(true);

      // Actualiza la lista de notificaciones, en caso de que sea necesario
      // Podrías llamar al método fetchNotifications si lo necesitas
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <>
      <Card
        className={cn(
          "hover:bg-neutral-800 transition-colors bg-neutral-950 text-white border-none relative",
          !isRead && "border-l-4 border-l-indigo-500",
        )}
      >
        {/* Red dot for unread notifications */}
        {!isRead && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 ml-2"></div>
          </div>
        )}
        {/* Mark as Read Button */}
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "absolute right-2 top-2 h-6 flex items-center space-x-1",
            isRead && "text-indigo-500",
          )}
          onClick={markAsRead}
        >
          <Check className="h-4 w-4" />
          <span>Mark as read</span>
        </Button>
        <CardContent className="flex items-center space-x-4 p-4">
          <Avatar className="h-10 w-10">
            {avatar_url ? (
              <AvatarImage src={avatar_url} alt="Sender's avatar" />
            ) : (
              <AvatarFallback>{message.charAt(0).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{message}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
