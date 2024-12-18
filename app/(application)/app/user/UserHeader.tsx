"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, LinkIcon } from "lucide-react";
import { UserTypes } from "@/controllers/client/useClient";
import { motion } from "framer-motion";

export default function UserHeader({ user }: { user: UserTypes }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const createdAt = "2023-03-01T00:00:00.000Z";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-neutral-700 mb-8 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-40 h-40 border-4 border-blue-500 rounded-full shadow-lg">
                <AvatarImage
                  src={user.avatar_url}
                  alt={user.name || "User avatar"}
                />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center md:text-left flex-grow space-y-4">
              <h1 className="text-4xl font-bold mb-2 text-white">
                {user.name}
              </h1>
              <p className="text-blue-400 text-xl mb-4">@{user.user_name}</p>
              <div className="flex flex-col sm:flex-row gap-4 text-neutral-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Joined {createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{user.location || "Location not specified"}</span>
                </div>
                {user.website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {new URL(user.website).hostname}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <Button
              className={`md:self-start transition-all duration-300 ease-in-out ${
                isFollowing
                  ? "bg-neutral-700 hover:bg-red-600 hover:text-white"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
          {user.bio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-neutral-300 text-lg"
            >
              {user.bio}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
