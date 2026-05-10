"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e5ea]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* BFH Logo */}
          <div className="flex items-center gap-3">
            <a href="https://www.bfh.ch/de/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/BFH_Logo_C_en_100_RGB.png"
                alt="BFH – Bern University of Applied Sciences"
                width={120}
                height={48}
                className="h-7 w-auto object-contain"
                priority
              />
            </a>
            <div className="leading-tight hidden sm:block">
              <div className="font-700 text-sm text-[#1a1a1a] leading-none">
                Deep-Tech Support Navigator
              </div>
              <div className="text-xs text-[#6b7280] leading-none mt-0.5">
                Institute for Digital Technology Management
              </div>
            </div>
          </div>

          {/* Desktop nav links */}
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

            {/* Yellow CTA — desktop only */}
            <button
              onClick={() => scrollTo("radar")}
              className="hidden sm:block text-sm font-600 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "var(--bfh-yellow)", color: "var(--bfh-dark)" }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bfh-yellow-hover)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bfh-yellow)")
              }
            >
              {t("nav.cta")}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü"
            >
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "var(--bfh-navy)",
                  transform: mobileOpen ? "translateY(8px) rotate(45deg)" : "",
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "var(--bfh-navy)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "var(--bfh-navy)",
                  transform: mobileOpen ? "translateY(-8px) rotate(-45deg)" : "",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e2e5ea] bg-white px-4 py-4 flex flex-col gap-1">
          {[
            { label: t("nav.radar"), id: "radar" },
            { label: t("nav.about"), id: "about" },
            { label: t("nav.feedback"), id: "feedback" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-sm font-600 px-3 py-3 rounded transition-colors hover:bg-[#f5f7fa]"
              style={{ color: "var(--bfh-dark)" }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("radar")}
            className="mt-2 text-sm font-600 px-4 py-3 rounded text-center"
            style={{ backgroundColor: "var(--bfh-yellow)", color: "var(--bfh-dark)" }}
          >
            {t("nav.cta")}
          </button>
        </div>
      )}
    </nav>
  );
}
