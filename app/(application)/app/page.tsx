"use client";

import dynamic from "next/dynamic";
import useSWR from "swr";

import { UserPropierties } from "types/User";

const PostsFeed = dynamic(() => import("@/components/feed/Feed"));

const DiscoverSideNav = dynamic(
  () => import("@/components/navigation/right/SideNav"),
  {
    ssr: false,
  },
);

const UserSideNav = dynamic(
  () => import("@/components/navigation/left/SideNav"),
);

export default function App() {
  const id = localStorage.getItem("user_id_cache");

  const fetchUser = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useSWR(`/api/user?id=${id}`, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  if (isLoading) return null;

  const user: UserPropierties = data.data[0];

  console.log(user.id, user.user_name)

  return (
    <main className="dark:bg-neutral-900 dark:text-white bg-neutral-50 text-black">
      <UserSideNav user={user} />
      <PostsFeed user={user} />
      <DiscoverSideNav />
    </main>
  );
}
