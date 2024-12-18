import { useClient, UserTypes } from "@/controllers/client/useClient";

import dynamic from "next/dynamic";

const NotificationsPage = dynamic(() => import("./components/Layout"), {
  ssr: false,
});
const UserSideNav = dynamic(
  () => import("@/components/navigation/left/SideNav"),
  { ssr: false },
);

import { PushNotificationPrompt } from "./Prompts";

export default async function Notifications() {
  const data = await useClient();
  let user: UserTypes["user"] = data.user;

  return (
    <div>
      <NotificationsPage />

      <UserSideNav user={user} />
    </div>
  );
}
