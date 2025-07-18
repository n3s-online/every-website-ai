import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Every Website AI",
  description: "AI-powered website generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
