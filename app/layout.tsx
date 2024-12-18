import type { Metadata } from "next";

import "./main.css";

export const metadata: Metadata = {
  title: "Nestcord - Explore arround the world",
  description: "Explore and discover what's happening around the world",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
