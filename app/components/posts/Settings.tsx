"use client";

import { MoreHorizontal, Trash, Flag, UserPlus, Delete } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import useSWR from 'swr';

import { useToast } from '@/hooks/use-toast';
import { revalidatePath } from 'next/cache';

export default function PostSettings({
  authorUsername,
  postId,
  authorId,
  userId,
}: {
  postId: string;
  userId: string | null;
  authorId: string;
  authorUsername: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data, mutate } = useSWR("/api/post/fetch");
  const { toast } = useToast()

  const deletePost = async () => {
    try {
      await fetch(`/api/posts/${postId}/delete`, { method: "POST", }).then(() => {
        router.refresh();
      })

      toast({
        title: "Post deleted",
        description: "Post has been deleted permanently",
        duration: 2000,
        variant: "destructive",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Post couldn't be deleted",
        duration: 2000,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex-1 text-white hover:bg-white/10 hover:text-indigo-400 transition-colors duration-200"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-neutral-900 text-white border border-neutral-800 rounded-lg shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer transition-colors duration-200">
              <UserPlus className="mr-3 h-4 w-4 text-indigo-400" />
              Follow <span className='font-semibold'>@{authorUsername}</span>
            </DropdownMenuItem>
            {userId === authorId && (
              <>
                <DropdownMenuSeparator className="bg-neutral-800" />

                <DropdownMenuItem
                  onClick={deletePost}
                  className="flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 cursor-pointer transition-colors duration-200"
                >

                  <Trash className="mr-3 h-4 w-4" />
                    <span>Delete Post</span>

                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator className="bg-neutral-800" />
            <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer transition-colors duration-200">
              <Flag className="mr-3 h-4 w-4 text-yellow-400" />
              <span>Report post</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

