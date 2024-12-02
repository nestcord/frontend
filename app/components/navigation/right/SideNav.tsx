"use client";

import dynamic from "next/dynamic";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Menu, X } from "lucide-react";

const SearchMenu = dynamic(() => import("@/components/navigation/right/Menu"), {
  ssr: false,
});

import Discover from "@/components/navigation/right/Discover";

export default function DiscoverSideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden bg-neutral-950 hover:bg-neutral-950 hover:text-white text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full overflow-y-auto bg-neutral-900 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 md:h-auto md:max-w-sm md:shadow-lg md:rounded-bl-lg`}
      >
        <div className="p-4 space-y-8 md:pt-20">
          <SearchMenu />
          <div className="border-t border-gray-700"></div>
          <Discover />
        </div>
      </div>
      <div className="hidden md:block fixed top-4 right-4 z-50"></div>
    </>
  );
}
