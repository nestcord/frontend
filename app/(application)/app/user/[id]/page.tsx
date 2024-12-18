"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "app/hooks/useUser";
import useSWR from "swr";
import UserHeader from "../UserHeader";
import UserPosts from "../UserPosts";

interface Post {
  id: string;
  content: string;
  user_id: string;
  likes: number;
  user: {
    name: string;
    user_name: string;
    avatar_url: string;
    created_at: string;
    id: string;
  };
  created_at: string;
  attachment: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" }); // Evita el almacenamiento en caché si los datos cambian frecuentemente.
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default function UserProfile({ params }: { params: { id: string } }) {
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser(params.id);

  const { data, error, isValidating } = useSWR(
    `/api/posts/fetch/user/${params.id}`,
    fetcher,
    {
      revalidateOnFocus: false, // Evita refetch innecesarios al cambiar de pestaña.
    },
  );

  const posts = data?.posts || [];

  if (isUserLoading || isValidating) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <div className="animate-pulse space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-indigo-700 rounded-full"
              style={{ animationDelay: `${index * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (isUserError || error || !user) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Error loading user profile or posts.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <UserHeader user={user} />

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="bg-neutral-800 border-neutral-700 mb-6">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-neutral-700 flex-1"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="data-[state=active]:bg-neutral-700 flex-1"
            >
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {posts.length > 0 ? (
              posts.map((post: Post) => <UserPosts key={post.id} post={post} />)
            ) : (
              <p className="text-center text-neutral-400">No posts yet.</p>
            )}
          </TabsContent>
          <TabsContent value="likes">
            <Card className="bg-neutral-800 border-neutral-700 mb-4">
              <CardContent className="p-4">
                <p className="text-center text-neutral-400">
                  Likes functionality to be implemented
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
