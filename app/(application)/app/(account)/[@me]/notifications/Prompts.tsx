"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const notificationSettings = localStorage.getItem("notifications");
    if (!notificationSettings) {
      setShowPrompt(true);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem(
          "notifications",
          JSON.stringify({
            state: {
              pushDesktopNotifications: true,
              enableSounds: false,
              unreadBadge: true,
            },
          }),
        );
        setShowPrompt(false);
        toast({
          title: "Notificaciones habilitadas",
          description:
            "Recibirás notificaciones importantes de nuestra aplicación.",
        });
      } else {
        toast({
          title: "Notificaciones no habilitadas",
          description:
            "Por favor, habilita las notificaciones en la configuración de tu navegador.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al solicitar permisos de notificación:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al habilitar las notificaciones.",
        variant: "destructive",
      });
    }
  };

  if (!showPrompt) {
    return null;
  }

  return <h1>df</h1>;
}
