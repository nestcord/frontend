"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  content: string;
  user_id: string;
  user: {
    name: string;
    user_name: string;
    avatar_url: string | null;
    created_at: string;
  } | null; // Aquí indicamos que `user` podría ser null
  likes: number;
  created_at: string;
  attachment: string;
}

export default function UserPosts({ post }: { post: Post }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const user = post.user;

  return (
    <Card
      key={post.id}
      className="w-full bg-neutral-950 text-white border-neutral-800 mb-4 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-1"
    >
      <CardHeader className="flex items-start space-x-4 pb-2">
        <Avatar className="h-12 w-12 border-2 border-primary transition-transform hover:scale-105">
          {user ? (
            <>
              <AvatarImage src={user.avatar_url ?? ""} alt={user.name} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback>NA</AvatarFallback> // Valor por defecto si no hay usuario
          )}
        </Avatar>
        <div className="flex-1">
          {user ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/app/user/${user.user_name}`}
                    className="font-semibold hover:underline"
                  >
                    {user.name}
                  </Link>
                  <span className="text-neutral-400">@{user.user_name}</span>
                  <span className="text-neutral-500 text-sm">·</span>
                  <span className="text-neutral-500 text-sm">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-neutral-900 border-neutral-700 text-white">
                <div className="flex justify-between space-x-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="ml-auto">
                    Follow
                  </Button>
                </div>
                <div className="space-y-1 mt-4">
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                  <p className="text-sm text-neutral-400">@{user.user_name}</p>
                </div>
                <p className="text-sm mt-2">User bio goes here</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-neutral-400">
                  <div>
                    <span className="font-semibold text-white">0</span>{" "}
                    Following
                  </div>
                  <div>
                    <span className="font-semibold text-white">0</span>{" "}
                    Followers
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <p className="text-neutral-400">Unknown user</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-400 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-neutral-900 border-neutral-700 text-white"
          >
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
              Delete post
            </DropdownMenuItem>
            <DropdownMenuItem>Edit post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-4 text-lg">{post.content}</p>
        {post.attachment && (
          <div className="relative aspect-video mb-4 bg-neutral-800 rounded-lg overflow-hidden">
            <Image
              src={post.attachment}
              alt="Post attachment"
              layout="fill"
              objectFit="cover"
              onLoad={() => setImageLoaded(true)}
              className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-neutral-500" />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-neutral-800 pt-4">
        <div className="flex items-center space-x-4 text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10"
          >
            <Heart className="w-4 h-4 mr-2" />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-green-400 hover:bg-green-400/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-purple-400 hover:bg-purple-400/10"
          >
            <Share2 className="w-4 h-4 mr-2" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
