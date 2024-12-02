"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User, Settings, LogOut, ChevronUp } from 'lucide-react';
import Link from "next/link";

import { UserTypes } from "@/controllers/client/useClient";
import { db } from "@/controllers/client/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserSettings from "@/components/settings/account/Edit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Account({ user }: UserTypes) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
    if (error) {
      console.error("Error trying to log out:", error);
    } else {
      router.push("/");
      console.log("[USER]:", user.id, "| Logged out");
    }
  };

  return (
    <section
      className="fixed bottom-0 left-0 right-0 flex justify-center m-4"
      id="profile-section"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative group">
            <Avatar className="h-10 w-10 cursor-pointer transition-transform duration-200 ease-in-out transform group-hover:scale-110">
              <AvatarImage
                src={user.avatar_url ?? ""}
                alt={user.name || "Usuario"}
              />
              <AvatarFallback>
                {user.name ? user.name.slice(0, 2).toUpperCase() : "UI"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <ChevronUp className="text-gray-500" size={20} />
            </div>
            <span className="sr-only">Abrir menú de opciones de usuario</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2 rounded-lg bg-neutral-800 border-none ml-4">
          <DropdownMenuLabel className="text-white">
            My account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/app/user/${user.user_name}`} passHref>
              <DropdownMenuItem className="cursor-pointer text-white">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  ⌘P
                </span>
              </DropdownMenuItem>
            </Link>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer text-white"
                  onSelect={(event) => {
                    event.preventDefault();
                    setIsSettingsOpen(true);
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <span className="ml-auto text-xs text-muted-foreground">⌘A</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="max-w-full max-h-full w-full h-full sm:w-[90%] sm:h-[90%] sm:max-w-[90%] sm:max-h-[90%] overflow-hidden bg-neutral-900 text-white">
                <DialogHeader>
                  <DialogTitle>User Settings</DialogTitle>
                  <DialogDescription>
                    Manage your account settings and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="h-[calc(100%-4rem)] overflow-hidden bg-neutral-950">
                  <UserSettings />
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-500"
            onSelect={() => setIsAlertOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘L</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Close your account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your current session. You will need to
              log in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              <Button variant="destructive" className="text-white">
                Log out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

