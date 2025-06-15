import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import SessionWrapper from "@/components/sessionWrapper";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthProvider from "@/context/AuthProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevMeet",
  description: "place where devs collab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     
   <AuthProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </ThemeProvider>
      </body>
    </AuthProvider>
    </html>
  );
}
