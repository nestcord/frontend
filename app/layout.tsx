import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nestcord - Explora y conoce lo que está pasando",
  description: "Explora y conoce lo que está pasando",
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
