import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends | Nestcord",
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-900 text-white">
        <main>{children}</main>
      </body>
    </html>
  );
}
