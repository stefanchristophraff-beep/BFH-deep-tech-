import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Deep-Tech Startup Radar Schweiz",
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
    title: "Deep-Tech Startup Radar Schweiz",
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
    <html lang="de" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
