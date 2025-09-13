import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ import Script
import "./globals.css";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata = {
  title: "TaskUber - Get Expert Help Fast",
  description:
    "Assignments, FYPs, coding, labs & content writing done hassle-free. Professional, deadline-driven, and confidential academic & technical help.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Identity Services script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
