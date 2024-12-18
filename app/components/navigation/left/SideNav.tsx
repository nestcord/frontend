"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Link from "next/link";

import { Home, Search, Bell, AtSign } from "lucide-react";

import { Button } from "@/components/ui/button";

import Account from "@/components/navigation/left/Account";

import { UserPropierties } from "types/User";

export default function UserSideNav({ user }: { user: UserPropierties }) {
  const userNavigation = [
    { id: "/app/channels/@me", icon: AtSign, label: "Direct Messages" },
    { id: "/app", icon: Home, label: "Home" },
    { id: "/app/discover", icon: Search, label: "Discover" },
    { id: "/app/@me/notifications", icon: Bell, label: "Notifications" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState("/app");
  const channel = usePathname() || "/app";

  useEffect(() => {
    if (channel) {
      setActiveChannel(channel);
    }
  }, [channel]);

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950 flex justify-around items-center h-16 z-50">
        {userNavigation.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full h-full p-0 relative group hover:bg-neutral-900"
          >
            <Link
              href={item.id}
              onClick={() => setActiveChannel(item.id)}
              className="flex flex-col items-center justify-center w-full h-full transition-all duration-200 ease-in-out"
              aria-label={`Navigate to ${item.label}`}
            >
              <item.icon
                strokeWidth={2}
                size={24}
                className={`transition-all duration-200 ${
                  activeChannel === item.id
                    ? "text-indigo-500"
                    : "text-gray-500"
                } group-hover:text-dark group-hover:scale-110`}
              />
            </Link>
          </Button>
        ))}
      </nav>
    );
  }
  return (
    <div className="flex h-screen">
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50
          w-16 bg-neutral-950 flex flex-col items-center py-4
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="flex flex-col items-center justify-center flex-1 space-y-6">
          {userNavigation.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-12 h-12 p-0 relative group hover:bg-neutral-900"
            >
              <Link
                href={item.id}
                onClick={() => setActiveChannel(item.id)}
                className="flex items-center justify-center w-full h-full rounded-full transition-all duration-200 ease-in-out"
                aria-label={`Navigate to ${item.label}`}
              >
                <item.icon
                  strokeWidth={2}
                  size={24}
                  className={`transition-all duration-200 ${
                    activeChannel === item.id
                      ? "text-indigo-500"
                      : "text-gray-500"
                  } group-hover:text-dark group-hover:scale-110`}
                />
                <span className="sr-only">{item.label}</span>
              </Link>
              <span className="absolute left-14 bg-neutral-950 text-white px-2 py-1 rounded opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100">
                {item.label}
              </span>
            </Button>
          ))}
        </nav>
        <Account />
      </aside>
    </div>
  );
}
