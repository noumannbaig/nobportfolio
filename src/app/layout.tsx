import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatAssistant } from "@/components/chat-assistant";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nouman Baig — Software & AI Engineer",
  description:
    "Portfolio of Nouman Baig, a software engineer building scalable cloud platforms, intelligent products, and high-performance APIs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
