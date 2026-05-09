"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: "var(--bfh-navy)", color: "rgba(255,255,255,0.6)" }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/BFH_Logo_C_en_100_RGB.png"
                alt="BFH – Bern University of Applied Sciences"
                width={110}
                height={44}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
              <span className="font-700 text-white text-sm">Deep-Tech Radar</span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("footer.tagline")}
            </p>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("footer.beta")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              { label: t("footer.legal"), href: "/impressum" },
              { label: t("footer.privacy"), href: "/datenschutz" },
              { label: t("footer.contact"), href: "mailto:stefan.raff@bfh.ch" },
            ].map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-8 flex flex-col gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.25)" }}>
            Institute for Digital Technology Management (IDTM) · Brückenstrasse 73, 3005 Bern ·{" "}
            <a href="mailto:stefan.raff@bfh.ch" className="hover:text-white transition-colors">
              stefan.raff@bfh.ch
            </a>
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://www.bfh.ch/de/forschung/forschungsbereiche/digital-technology-management/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Institute for Digital Technology Management
              </a>{" "}
              — Deep-Tech Radar. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-green-400 rounded-full"
                style={{ opacity: 0.8 }}
              />
              <span>Beta v0.1</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
