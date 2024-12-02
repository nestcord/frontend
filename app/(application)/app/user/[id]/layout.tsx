import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { useClient, UserTypes } from "@/controllers/client/useClient";
import UserSideNav from "@/components/navigation/left/SideNav";

export const metadata: Metadata = {
  title: "Nestcord | Home",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const data = await useClient();
    let user: UserTypes["user"] = data.user;

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <main>
            {children}
            <UserSideNav user={user} />

            </main>
        <Toaster />
      </body>
    </html>
  );
}
