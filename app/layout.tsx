import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


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
       
        <header className="p-4 bg-gray-800 text-white text-center">
          
          <h1 className="text-2xl font-bold">Class Attendance App</h1>
          <nav className="mt-2">
            <Link href="/" className="mx-2 hover:underline">Home</Link>
            <Link href="/dashboard" className="mx-2 hover:underline">Dashboard</Link>
            
          </nav>
        </header>
        
        {children}
        <footer className="p-4 bg-gray-800 text-white text-center mt-8">
          <p>&copy; 2024 Class Attendance App. All rights reserved.</p>
        </footer>
        
      </body>
    </html>
  );
}
