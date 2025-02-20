"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";// Ensure correct path
import Providers from "@/components/Providers";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

  if (pathname === "/sign_in"  || pathname === "/sign_up"   || pathname === "/editprofile"  || pathname === "/account" || pathname === "/settings" || pathname === "/payment" || pathname === "/reset_password" || pathname==="/forget_password") {
    return (
      <html lang="en" className="font-serif">
        
        <body className="font-serif antialiased bg-gray-900 text-gray-300 h-screen flex items-center justify-center">
            <Providers>{children}</Providers> 
           {/* Render the sign-in page */}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
             <Layout>{children}</Layout>
        </Providers>
     
      </body>
    </html>
  );
}
