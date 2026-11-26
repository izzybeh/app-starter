import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/patterns/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { site } from "@/config/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
