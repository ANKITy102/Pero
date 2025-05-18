import { Carter_One, Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const carterOne = Carter_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carter-one",
});