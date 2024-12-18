"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { db } from "@/controllers/client/client";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  user_id: string;
  message: string;
  avatar_url: string;
  created_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotifications = useCallback(
    async (userId: string) => {
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
    },
    [toast],
  );

  const listenForNewNotifications = useCallback(
    (userId: string) => {
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

              toast({
                title: "New Notification",
                description: newNotification.message,
              });

              if (Notification.permission === "granted") {
                new Notification("(+1) New Notification", {
                  body: newNotification.message,
                  icon: "/favicon.webp",
                });
              } else if (Notification.permission === "default") {
                Notification.requestPermission();
              }
            }
          },
        )
        .subscribe();

      return () => {
        db.removeChannel(channel);
      };
    },
    [toast],
  );

  useEffect(() => {
    const userId = localStorage.getItem("user_id_cache");
    if (!userId) return;

    fetchNotifications(userId);
    const cleanup = listenForNewNotifications(userId);

    return () => cleanup();
  }, [fetchNotifications, listenForNewNotifications]);

  return (
    <NotificationContext.Provider value={{ notifications, isLoading }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
