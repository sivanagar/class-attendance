
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Class Attendance App",
  description: "Created by Sivan Kaplan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-background">
       
       
        {/* 1. Minimal Navbar */}
      <header className="flex h-16 items-center justify-between border-b px-6 lg:px-10">
        <div className="text-xl font-bold tracking-tight">Attendify</div>
        <nav>
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup" className="ml-2">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
        
        
        <footer >
          <p>&copy; 2024 Class Attendance App. All rights reserved.</p>
        </footer>
        </div>
      </body>
    </html>
  );
}
