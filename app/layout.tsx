import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deep Tech Startup Radar Schweiz",
  description:
    "Alle Förderprogramme, Acceleratoren und Support-Angebote für Deep Tech Startups in der Schweiz. Eine lebendige Datenbank der BFH.",
  keywords: [
    "Deep Tech",
    "Startup",
    "Schweiz",
    "Switzerland",
    "Förderung",
    "Accelerator",
    "BFH",
    "Innosuisse",
  ],
  openGraph: {
    title: "Deep Tech Startup Radar Schweiz",
    description:
      "Alle Förderprogramme und Support-Angebote für Deep Tech Startups in der Schweiz.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
