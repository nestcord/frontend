"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  X,
  Image,
  SmilePlus,
  BarChart2,
  MapPin,
} from "lucide-react";
import { db } from "@/controllers/client/client";
import { UserTypes } from "@/controllers/client/useClient";

import data from "@emoji-mart/data/sets/14/twitter.json";
import Picker from "@emoji-mart/react";

export default function Component({
  postId,
  postContent,
  authorName,
  authorUsername,
  authorAvatar,
  user,
}: {
  postId: string;
  postContent: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  user: UserTypes;
}) {
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiSelect = (emoji: { native: string }) => {
    setComment((prevContent) => prevContent + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      console.log("Datos de comentario:", {
        content: comment,
        postId: postId,
        user_id: user.user.id,
      });

      const { error } = await db.from("comments").insert([
        {
          content: comment,
          postId: postId,
          user_id: user.user.id,
        },
      ]);

      if (error) {
        console.error("Error en la inserción:", error);
        return;
      }

      setComment("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex-1 text-white hover:bg-transparent hover:text-indigo-500"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-neutral-950 text-white border-none">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-2">
          <span className="text-blue-400 text-sm font-medium">Drafts</span>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-start space-x-3 mb-8">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback>{authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute w-0.5 bg-zinc-800 left-1/2 -translate-x-1/2 top-12 h-[calc(100%+2rem)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-bold">{authorName}</span>
                <span className="text-zinc-500">@{authorUsername} · 11h</span>
              </div>
              <p className="text-zinc-300 mt-1">{postContent}</p>
              <p className="text-zinc-500 text-sm mt-1">
                Replying to{" "}
                <span className="text-blue-400">@{authorUsername}</span>
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 mt-8">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.user.avatar_url ?? ""}
                alt={user.user.name || "Usuario"}
              />
              <AvatarFallback>
                {user.user.name
                  ? user.user.name.slice(0, 2).toUpperCase()
                  : "UI"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment the post"
                className="min-h-[100px] bg-transparent border-none text-white resize-none placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-indigo-400 hover:bg-indigo-500"
                  >
                    <Image className="h-5 w-5" />
                  </Button>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-indigo-400 hover:bg-indigo-500"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <SmilePlus className="h-5 w-5" />
                    </Button>
                    {showEmojiPicker && (
                      <div
                        ref={emojiPickerRef}
                        className="absolute top-full left-0 mt-2 z-50"
                        style={{
                          background: "white",
                          borderRadius: "10px",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Picker
                          data={data}
                          onEmojiSelect={handleEmojiSelect}
                          theme="dark"
                          title="Elige un emoji…"
                          set="twitter"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-indigo-400 hover:bg-indigo-500"
                  >
                    <BarChart2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-indigo-400 hover:bg-indigo-500"
                  >
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  onClick={handleCommentSubmit}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-1 text-sm font-bold"
                  disabled={!comment.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
