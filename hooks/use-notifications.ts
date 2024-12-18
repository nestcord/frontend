"use client";

import { useEffect, useState, useCallback } from "react";
import { db } from "@/controllers/client/client";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  post_id: string;
  user_id: string;
  message: string;
  avatar_url: string;
  created_at: string;
}

export function useNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Función para verificar si las notificaciones están habilitadas
  const isPushNotificationEnabled = useCallback(() => {
    const notificationSettings = localStorage.getItem("notifications");
    if (!notificationSettings) return false;

    try {
      const settings = JSON.parse(notificationSettings);
      return settings?.state?.pushDesktopNotifications === true;
    } catch (error) {
      console.error("Error parsing notification settings:", error);
      return false;
    }
  }, []);

  // Solicitar permiso de notificaciones al navegador
  const requestNotificationPermission = useCallback(async () => {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission); // Verifica el valor de la respuesta
    }
  }, []);
  

  // Mostrar notificación en el navegador
  const showBrowserNotification = useCallback((message: string) => {
    if (Notification.permission === "granted") {
      new Notification("New Notification", {
        body: message,
        icon: "/favicon.webp", // Cambia por el icono que prefieras
      });
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
  
    setIsLoading(true);
    const { data, error } = await db
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
  
    if (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error",
        description: "Failed to load notifications. Please try again.",
        variant: "destructive",
      });
      return;
    }
  
    if (data) {
      setNotifications(data);
    }
    setIsLoading(false);
  }, [userId, toast]);
  

  useEffect(() => {
    fetchNotifications();

    if (!userId) return;

    const channel = db
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          if (newNotification) {
            setNotifications((prev) => [newNotification, ...prev]);

            // Mostrar notificación en pantalla
            toast({
              title: "New Notification",
              description: newNotification.message,
            });

            // Verificar permisos de notificaciones del navegador
            if (isPushNotificationEnabled()) {
              if (Notification.permission === "granted") {
                showBrowserNotification(newNotification.message);
              } else {
                requestNotificationPermission();
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(channel);
    };
  }, [
    userId,
    fetchNotifications,
    toast,
    isPushNotificationEnabled,
    requestNotificationPermission,
    showBrowserNotification,
  ]);

  return { notifications, isLoading, refetch: fetchNotifications };
}
