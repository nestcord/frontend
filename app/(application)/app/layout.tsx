import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "@/components/Theme";

export const metadata: Metadata = {
  title: "Nestcord | Home",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="ApplicationThemeStore"
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
