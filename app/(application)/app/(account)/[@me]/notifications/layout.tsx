import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications (0) | Nestcord",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
