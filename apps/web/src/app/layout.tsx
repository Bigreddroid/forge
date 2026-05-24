import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORGE — AI Growth System",
  description: "The open source AI growth system for founders who refuse to be average.",
  openGraph: {
    title: "FORGE",
    description: "AI-powered market dominance for ambitious founders.",
    siteName: "FORGE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
