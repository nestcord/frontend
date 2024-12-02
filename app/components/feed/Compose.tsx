"use client";
import dynamic from "next/dynamic";
import { ComposePostButton } from "./Button";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { UserTypes } from "@/controllers/client/useClient";
import { db } from "@/controllers/client/client";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/14/twitter.json";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ImageIcon,
  SmileIcon,
  CalendarIcon,
  MapPinIcon,
  X,
  AtSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { addPost } from "../actions/Publish";

export function ComposePost({ user }: UserTypes) {
  const formRef = useRef<HTMLFormElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null); // Ref para el picker de emojis

  const [content, setContent] = useState("");
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const attachmentInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setDisplayEmojiPicker(false);
      }
    }

    if (displayEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpia el evento al desmontar o cuando el picker se cierra
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [displayEmojiPicker]);

  const handleEmojiSelect = (emoji: { native: string }) => {
    setContent((prevContent) => prevContent + emoji.native);
    setDisplayEmojiPicker(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const contentValue = e.target.value;
    setContent(contentValue);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const attachment = event.target.files?.[0];
    if (attachment) {
      // Genera un nombre único para el archivo
      const uniqueFileName = `${Date.now()}-${attachment.name}`;

      // Sube el archivo al bucket "attachments"
      const { data, error } = await db.storage
        .from("attachments")
        .upload(uniqueFileName, attachment)

      
      if (error) {
        console.error("Error uploading attachment:", error.message);
        return;
      }

      if (data) {
        // Obtiene la URL pública del archivo subido
        const { data: publicUrlData } = db.storage
          .from("attachments")
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          // Muestra la imagen utilizando la URL pública
          setAttachment(publicUrlData.publicUrl);
        }
      }
    }
  };

  const handleImageClick = () => {
    attachmentInput.current?.click();
  };
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6 bg-background text-foreground">
      <form
        ref={formRef}
        action={async (formData) => {
          // Llamar a addPost con el attachment URL
          await addPost(formData, attachment, user); // Pasamos el attachment URL
          formRef.current?.reset();
          setContent(""); // Reset content state after submitting
        }}
        className="w-full bg-neutral-950 text-white border-none rounded-lg p-4"
      >
        <div className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user.avatar_url ?? ""}
              alt={user.name || "Usuario"}
            />
            <AvatarFallback>
              {user.name ? user.name.slice(0, 2).toUpperCase() : "UI"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">
              {user.name} ·{" "}
              <span className="text-sm text-gray-400">@{user.user_name}</span>
            </p>
            <p className="text-sm text-gray-400">
              The post will be public for everyone.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Textarea
            name="content"
            rows={4}
            value={content}
            onChange={handleContentChange}
            className="min-h-[50px] text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none p-0 bg-transparent hover:border-white"
            placeholder="What's happening?"
          ></Textarea>
          {attachment && (
            <div className="pt-4 relative">
              <img
                src={attachment}
                alt="Attachment preview"
                className="max-w-full h-auto rounded-lg border"
              />
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none"
                aria-label="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex flex-col items-start space-y-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={handleImageClick}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add attachment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setDisplayEmojiPicker(!displayEmojiPicker)}
                    >
                      <SmileIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <AtSign className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mention</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input
                type="file"
                ref={attachmentInput}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                aria-label="Upload image"
              />
            </div>
            {displayEmojiPicker && (
              <div
                ref={pickerRef} // Asigna la referencia al contenedor del Picker
                className="absolute mt-24 z-50" // Ajusta el margen superior para colocarlo más abajo
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="dark"
                  title="Pick an emoji..."
                  set="twitter"
                />
              </div>
            )}

            <ComposePostButton content={content} attachment={attachment} />
          </div>
        </div>
      </form>
    </section>
  );
}
