"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

interface NotificationSettings {
  pushDesktopNotifications: boolean;
  enableSounds: boolean;
  unreadBadge: boolean;
}

export function NotificationSettingsDropdown() {
  const [settings, setSettings] = useState<NotificationSettings>({
    pushDesktopNotifications: true,
    enableSounds: false,
    unreadBadge: true,
  });

  useEffect(() => {
    const savedSettings = Cookies.get("notifications");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings).state);
    }
  }, []);

  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    Cookies.set("notifications", JSON.stringify({ state: newSettings }), {
      expires: 365,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-colors duration-200"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-neutral-800 border-neutral-700 text-white shadow-lg"
          sideOffset={5}
        >
          <DropdownMenuLabel className="font-bold">
            Notification Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <div className="p-2 space-y-2">
            {/* Push Notifications Switch */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-notifications"
                className="text-sm text-neutral-300"
              >
                Push Notifications
              </Label>
              <Switch
                id="push-notifications"
                checked={settings.pushDesktopNotifications}
                onCheckedChange={(checked) =>
                  updateSettings("pushDesktopNotifications", checked)
                }
                className="data-[state=checked]:bg-indigo-600 transition-colors duration-200"
              />
            </div>

            {/* Enable Sounds Switch */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="enable-sounds"
                className="text-sm text-neutral-300"
              >
                Enable Sounds
              </Label>
              <Switch
                id="enable-sounds"
                checked={settings.enableSounds}
                onCheckedChange={(checked) =>
                  updateSettings("enableSounds", checked)
                }
                className="data-[state=checked]:bg-indigo-600 transition-colors duration-200"
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
