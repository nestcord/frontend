import dynamic from "next/dynamic";

import { useClient, UserTypes } from "@/controllers/client/useClient";

const Feed = dynamic(() => import("@/components/feed/Feed"), {
  ssr: false,
});

const DiscoverSideNav = dynamic(() => import("@/components/navigation/right/SideNav"), {
  ssr: false,
})


import UserSideNav from "@/components/navigation/left/SideNav";

export default async function App() {
  // Fetch user data using the useClient hook
  const data = await useClient();
  let user: UserTypes["user"] = data.user;

  return (
    <div className="bg-neutral-900">
      <UserSideNav user={user} />

      <Feed user={user} />

      <DiscoverSideNav />
    </div>
  );
}
