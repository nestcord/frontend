"use client";
import { useRef, useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostsSkeleton } from "./Feed";
import { UserTypes } from "@/controllers/client/useClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Comment from "../posts/Comment";
import { Heart, Share, ClipboardCheck } from "lucide-react";
import PostSettings from "../posts/Settings";

import { useToast } from "@/hooks/use-toast";

export interface Post {
  id: string;
  content: string;
  user_id: string;
  user: {
    name: string;
    user_name: string;
    avatar_url: string;
    created_at: string;
  };
  likes: number;
  created_at: string;
  attachment: string;
}

const fetchPosts = async (url: string): Promise<{ posts: Post[] }> => {
  const res = await fetch(url);
  return res.json();
};

export default function Posts({ user }: UserTypes ) {
  const { toast } = useToast()

  // Paginación usando SWR Infinite
  const { data, size, setSize, isValidating, error } = useSWRInfinite(
    (index) => `http://localhost:3000/api/posts/fetch?page=${index + 1}`,
    fetchPosts
  );

  const posts = data ? data.flatMap((page) => page.posts) : [];
  const hasMore = data && data[data.length - 1]?.posts?.length === 10;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const observeElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      if (node) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore && !isValidating) {
              setSize((prev) => prev + 1);
            }
          },
          { threshold: 1 }
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [hasMore, isValidating, setSize]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  if (error) {
    return <p className="text-center text-red-500">Error al cargar publicaciones.</p>;
  }

  if (!data) {
    return <PostsSkeleton />;
  }

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6 bg-background text-foreground">
      {posts?.map((post: Post) => (
        <Card
          key={post.id}
          className="w-full bg-neutral-950 text-white transition-all duration-300 border border-transparent hover:border-primary hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-1"
        >
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-2">
            <Avatar className="h-12 w-12 border-2 border-primary transition-transform group-hover:scale-105">
              <AvatarImage
                src={post.user.avatar_url ?? ""}
                alt={post.user.name || "Usuario"} />
              <AvatarFallback>
                {post.user.name
                  ? post.user.name.slice(0, 2).toUpperCase()
                  : "UI"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm sm:text-base">
                          <Link
                            href={"/app/user/" + post.user.user_name}
                          className="hover:underline transition-colors font-semibold"
                          >
                          {post.user.name}
                        </Link>{" "}
                        ·{" "}
                        <span className="text-gray-400">
                          @{post.user.user_name}
                        </span>
                      </p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-gray-900 text-white">
                    <div className="flex justify-between space-x-4">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={post.user.avatar_url} />
                        <AvatarFallback>
                          {post.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="ml-auto">
                        Follow
                      </Button>
                    </div>
                    <div className="space-y-1 mt-4">
                      <h4 className="text-lg font-semibold text-white">
                        {post.user.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        @{post.user.user_name}
                      </p>
                    </div>
                    <p className="text-sm mt-2">
                      {post.user.name || "No bio available"}
                    </p>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                      <div>
                        <span className="font-semibold text-white"></span>{" "}
                        Following
                      </div>
                      <div>
                        <span className="font-semibold text-white"></span>{" "}
                        Followers
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-xs text-gray-400 mt-1 sm:mt-0">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </CardHeader><CardContent className="group-hover:bg-neutral-900 transition-colors">
            {post.content && (
              <p className="text-base leading-relaxed mb-4">{post.content}</p>
            )}

            {post.attachment && (
              <div className="relative w-full">
                <Image
                  src={post.attachment}
                  alt={post.user.name + "'s post"}
                width={500}
                height={500}
                className="rounded-lg w-auto h-auto"
                />
              </div>
            )}
          </CardContent><CardFooter className="flex flex-wrap justify-between border-t border-gray-800 pt-4">
            <div className="flex space-x-2 w-full sm:w-auto mb-2 sm:mb-0">
              <Comment
                user={{ user }}
                postId={post.id}
                postContent={post.content}
                authorName={post.user.name}
                authorUsername={post.user.user_name}
                authorAvatar={post.user.avatar_url} />
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-transparent hover:text-indigo-500"
              >
                <Heart className="w-4 h-4 mr-2" />
                <span className="text-sm">{post.likes || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-transparent hover:text-indigo-500"
                onClick={() => {
                  toast({
                    style: {
                      color: "white",
                      background: "#0a0a0a",
                      border: "2px solid #171717",
                      borderRadius: "0.5rem",
                    },
                    description: "Copied to clipboard",
                    duration: 1000
                  }); 
                  navigator.clipboard.writeText(window.location.href + "/status/" + post.id);
                }}
              >
                <Share className="w-4 h-4 mr-2" />
                <span className="sr-only">Share</span>
              </Button>
            </div>

            <PostSettings
              authorUsername={post.user.user_name}
              postId={post.id}
              authorId={post.user_id}
              userId={user.id} />
          </CardFooter>
        </Card>
      ))}
      {isValidating && hasMore && <p className="text-center text-gray-400">Cargando más publicaciones...</p>}
{!hasMore && <p className="text-center text-gray-400">No hay más publicaciones.</p>}

    </section>
  );
}