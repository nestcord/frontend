"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "./Notifications";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationSettingsDropdown } from "./NotificationsSettings";

export default function NotificationsPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("user_id_cache");
    setUserId(userIdFromLocalStorage);
  }, []);

  const { notifications, isLoading, refetch } = useNotifications(userId);

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col items-center bg-neutral-900 text-white">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={refetch}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <NotificationSettingsDropdown />
            </div>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  post_id={notification.post_id}
                  message={notification.message}
                  avatar_url={notification.avatar_url}
                  created_at={notification.created_at}
                  read={false}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No notifications yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
