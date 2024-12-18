import { useEffect } from "react";
import { db } from "@/controllers/client/client";
import useSWR from "swr";

type ProfileData = {
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers_count: number;
  following_count: number;
};

const fetcher = async (id: string) => {
  const { data, error } = await db
    .from("users")
    .select("user_name, id, name, avatar_url, created_at")
    .eq("user_name", id)
    .single();

  if (error) console.error(error.code, error.message);
  return data;
};

export function useUser(id: string) {
  const { data, error } = useSWR(id, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
