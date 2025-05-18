import type { Metadata } from "next";
import { Carter_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { geistMono, geistSans } from "./font";




export const metadata: Metadata = {
  title: "Talk With Legends | AI Replica Platform",
  description:
    "Chat with AI replicas of historical and famous personalities like Mahatma Gandhi, Bill Gates, Elon Musk, and more. Get inspired through realistic conversations powered by Sensay AI.",
  metadataBase: new URL("https://yourdomain.com"),
  keywords: [
    "AI Replica",
    "Talk to historical figures",
    "Chat with Elon Musk",
    "Sensay API",
    "Inspiration platform",
    "AI chat",
    "AI personalities",
  ],
  openGraph: {
    title: "Talk With Legends | AI Replica Platform",
    description:
      "Realistic AI chat experience with legends and historical icons. Powered by Sensay API.",
    url: "https://yourdomain.com", // your actual domain
    siteName: "Talk With Legends",
    images: [
      {
        url: "https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747545654/Screenshot_2025-05-18_104825_wfoe4d.png", 
        width: 1200,
        height: 630,
        alt: "Talk With Legends Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  }
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
        <Toaster
          toastOptions={{
            // Default options for all toasts
            style: {
              background: "#222", // dark background
              color: "#fff", // white text
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)", // subtle shadow
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#1e7e34", // dark green for success
                color: "white",
              },
            },
            error: {
              style: {
                background: "#c53030", // dark red for errors
                color: "white",
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
