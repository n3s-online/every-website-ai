import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
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
      <head>
        <PlausibleProvider
          domain="everywebsite.app"
          customDomain="https://plausible-analytics-ce-production-d9c9.up.railway.app"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
