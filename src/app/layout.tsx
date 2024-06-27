import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import PHProvider from "@/components/posthog/PHProvider";
import PostHogPageView from "@/components/posthog/PostHogPageView";
import ListsList from "@/components/ListsList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Task",
  description: "A team-based task management app built with Clerk Organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <PHProvider>
          <body className={`h-screen ${inter.className}`}>
            <PostHogPageView />
            <Navbar />
            <div className="flex justify-center md:mx-0 h-full">
              <div className="w-[300px] bg-slate-50 h-100 border-r border-slate-200 lg:flex hidden p-2">
                <ListsList />
              </div>
              <div className="flex flex-col w-full max-w-[960px] p-2">
                {children}
              </div>
            </div>
          </body>
          <Toaster />
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
