import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeployIt",
  description: "Deploy applications from GitHub in one click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
