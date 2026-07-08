import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/lib/context/theme-context";
import "./globals.css";
import { ToastProvider } from "@/lib/context/toast-context";
import { AuthProvider } from "@/lib/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevLinks",
  description: "Developer community link sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`min-h-full flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
