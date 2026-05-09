"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e5ea] overflow-hidden">
      {/* Subtle Swiss flag watermark */}
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 opacity-10"
      >
        <rect width="32" height="32" fill="var(--bfh-navy)" />
        <rect x="6" y="13" width="20" height="6" fill="white" />
        <rect x="13" y="6" width="6" height="20" fill="white" />
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* BFH Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/BFH_Logo_C_en_100_RGB.png"
              alt="BFH – Bern University of Applied Sciences"
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-700 text-sm text-[#1a1a1a] leading-none">
                Deep-Tech Startup Radar
              </div>
              <div className="text-xs text-[#6b7280] leading-none mt-0.5">
                Institute for Digital Technology Management
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-600 text-[#3d3d3d]">
            <button
              onClick={() => scrollTo("radar")}
              className="hover:text-[#1e3d5c] transition-colors border-b-2 border-transparent hover:border-[#f0b429] pb-0.5"
            >
              {t("nav.radar")}
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-[#1e3d5c] transition-colors border-b-2 border-transparent hover:border-[#f0b429] pb-0.5"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollTo("feedback")}
              className="hover:text-[#1e3d5c] transition-colors border-b-2 border-transparent hover:border-[#f0b429] pb-0.5"
            >
              {t("nav.feedback")}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex rounded border border-[#e2e5ea] overflow-hidden text-xs font-600">
              <button
                onClick={() => setLang("de")}
                className="px-2.5 py-1.5 transition-colors"
                style={
                  lang === "de"
                    ? { backgroundColor: "var(--bfh-navy)", color: "#fff" }
                    : { backgroundColor: "#fff", color: "var(--bfh-muted)" }
                }
              >
                DE
              </button>
              <button
                onClick={() => setLang("en")}
                className="px-2.5 py-1.5 transition-colors"
                style={
                  lang === "en"
                    ? { backgroundColor: "var(--bfh-navy)", color: "#fff" }
                    : { backgroundColor: "#fff", color: "var(--bfh-muted)" }
                }
              >
                EN
              </button>
            </div>
            {/* Yellow CTA */}
            <button
              onClick={() => scrollTo("radar")}
              className="hidden sm:block text-sm font-600 px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: "var(--bfh-yellow)",
                color: "var(--bfh-dark)",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--bfh-yellow-hover)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--bfh-yellow)")
              }
            >
              {t("nav.cta")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
