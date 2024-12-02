import { useClient, UserTypes } from "@/controllers/client/useClient";
import SideNav from "../../../../../components/navigation/left/SideNav";
import ChannelTabs from "../components/Home";

export default async function ChannelHome() {
  const data = await useClient();
  const user: UserTypes["user"] = data.user;

  return (
    <>
      <SideNav user={user} />
      <ChannelTabs />
    </>
  );
}
