"use client";
import useSWR from "swr";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Loader2, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { UserTypes } from "@/controllers/client/useClient";

type User = UserTypes["user"];

export default function SearchMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleOpen]);

  const { data, error, isLoading } = useSWR(
    query.trim() ? `/api/users?query=${encodeURIComponent(query.trim())}` : null,
    fetcher
  );

  const results = data?.users || [];
  
  // Si hay un error en la petición, mostramos el mensaje
  if (error) {
    console.error("Error fetching users:", error);
  }

  const memoizedResults = useMemo(() => results, [results]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      // Si el campo está vacío, no hacer la búsqueda
      setOpen(false); // Cerrar el dropdown si no hay texto
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (open) {
        // Si la búsqueda está abierta, se realiza la búsqueda
        setQuery(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, open]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full bg-neutral-800 text-gray-200 shadow-lg rounded-full hover:bg-neutral-700 transition-colors"
            onClick={toggleOpen}
            aria-label="Open search menu"
          >
            <Search className="mr-2 h-4 w-4" />
            Search users...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-600 bg-neutral-700 px-1.5 font-mono text-[10px] font-medium text-gray-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-none bg-neutral-900 shadow-xl">
          <Command className="rounded-lg bg-neutral-900 text-gray-200">
            <div className="flex items-center border-b border-neutral-700 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search users..."
                value={query}
                onValueChange={handleInputChange}
                className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInputChange("")}
                  className="h-auto p-1 text-gray-400 hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CommandList>
              <CommandEmpty>
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : error ? (
                  <div className="text-red-400 py-6 px-4">{error}</div>
                ) : query.trim() !== "" ? (
                  <div className="text-gray-400 py-6 px-4">
                    No users found. Try a different search term.
                  </div>
                ) : (
                  <div className="text-gray-400 py-6 px-4">
                    Start typing to search for users.
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {memoizedResults.map((user: User) => (
                  <CommandItem
                    key={user.id}
                    className="px-4 py-3 cursor-pointer hover:bg-neutral-800 transition-colors"
                  >
                    <Link
                      href={`/users/${user.user_name}`}
                      className="flex items-center space-x-4 w-full"
                    >
                      <Avatar className="h-10 w-10 border-2 border-blue-500">
                        <AvatarImage
                          src={user.avatar_url}
                          alt={user.user_name ?? "User avatar"}
                        />
                        <AvatarFallback>
                          {user.user_name?.slice(0, 2).toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-200">
                          {user.user_name}
                        </p>
                        <p className="text-sm text-gray-400">{user.name}</p>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
