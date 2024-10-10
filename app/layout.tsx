import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestcord",
  description: "Explora y conoce lo que está pasando",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
