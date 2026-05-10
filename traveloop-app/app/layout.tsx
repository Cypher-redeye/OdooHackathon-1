import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traveloop — Your AI-Powered Travel Companion",
  description: "Plan, organize, and share personalized travel itineraries with ease. Build multi-city trips, track budgets, and explore 50,000+ destinations.",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,700,800,900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
