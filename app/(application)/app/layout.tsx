import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { useClient, UserTypes } from "@/controllers/client/useClient";

export const metadata: Metadata = {
  title: "Nestcord | Home",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
