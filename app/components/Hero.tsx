"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const TYPEWRITER_TERMS = [
  "Co-Founder",
  "Coaching",
  "Funding",
  "Infrastructure Labs",
  "Investor Access",
  "Market Access",
  "Industry Access",
  "Mentoring",
  "Network",
  "Start-up Camps",
  "Strategic Partnerships",
  "Training",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function TypewriterText({ lang: _lang }: { lang: string }) {
  const [terms] = useState(() => shuffle(TYPEWRITER_TERMS));
  const [termIndex, setTermIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const term = terms[termIndex];

    if (!deleting && displayed.length < term.length) {
      const t = setTimeout(() => setDisplayed(term.slice(0, displayed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === term.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTermIndex((i) => (i + 1) % terms.length);
    }
  }, [displayed, deleting, termIndex, terms]);

  return (
    <span>
      <span style={{ color: "var(--bfh-yellow)", fontWeight: 900 }}>
        {displayed}
      </span>
      <span
        className="inline-block w-0.5 h-[1em] ml-1 align-middle animate-pulse"
        style={{ backgroundColor: "var(--bfh-yellow)" }}
      />
    </span>
  );
}

/**
 * Switzerland border — clockwise from NW Jura.
 * Coordinates derived from real lon/lat anchor points:
 *   x = (lon − 5.96) × 220,  y = (47.85 − lat) × 280
 * ViewBox: 0 0 1010 590
 *
 * Key extremes:
 *   N  Schaffhausen bump  (576,  11)
 *   E  Martina/Inn        (994, 272)
 *   S  Chiasso (Ticino)   (673, 563)
 *   W  Chancy (Geneva)    (  2, 477)
 */
const CH_PATH = `
  M 244 118
  L 361  76
  L 427  78
  L 515  56
  L 576  11
  L 614  45
  L 708  45
  L 774  84
  L 810  84
  L 827 182
  L 772 210
  L 889 260
  L 994 272
  L 983 344
  L 845 420
  L 772 468
  L 673 563
  L 664 518
  L 620 470
  L 559 518
  L 455 510
  L 449 462
  L 361 412
  L 266 563
  L 206 448
  L   2 477
  L  30 459
  L  64 411
  L 151 371
  L 149 298
  L  97 224
  L 123 154
  Z
`.trim();

export default function Hero() {
  const { t, lang } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative pt-16 overflow-hidden"
      style={{ backgroundColor: "var(--bfh-navy)" }}
    >
      {/* Switzerland outline + city markers — decorative background */}
      <svg
        viewBox="-10 -20 1030 610"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full"
        style={{ opacity: 0.18 }}
      >
        <path
          d={CH_PATH}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>

      {/* Yellow left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: "var(--bfh-yellow)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-600 px-3 py-1.5 mb-6"
            style={{
              backgroundColor: "rgba(240,180,41,0.15)",
              color: "var(--bfh-yellow)",
              border: "1px solid rgba(240,180,41,0.3)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--bfh-yellow)" }}
            />
            {t("hero.badge")} — Living Database
          </div>

          <div className="mb-2">
            <h1 className="leading-tight text-white text-5xl sm:text-6xl lg:text-7xl" style={{ fontWeight: 900 }}>
              {t("hero.title")}
            </h1>
          </div>
          <div className="mb-6 min-h-[4rem] sm:min-h-[3.5rem]">
            <p className="text-xl sm:text-2xl lg:text-3xl" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>
              {lang === "de" ? "Finde" : "Find"}{" "}
              <span style={{ color: "var(--bfh-yellow)", fontWeight: 900 }}>#</span>
              <TypewriterText lang={lang} />{" "}
              {lang === "de" ? "für dein Deep-Tech Startup" : "for your Deep-Tech Startup"}
            </p>
          </div>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => scrollTo("radar")}
              className="font-600 px-8 py-4 text-base transition-colors"
              style={{ backgroundColor: "var(--bfh-yellow)", color: "var(--bfh-dark)" }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bfh-yellow-hover)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bfh-yellow)")
              }
            >
              {t("hero.cta.primary")}
            </button>
            <button
              onClick={() => scrollTo("feedback")}
              className="font-600 px-8 py-4 text-base transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "transparent",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
              }}
            >
              {t("hero.cta.secondary")}
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-10 pt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {[
              { value: t("hero.stat1.value"), label: t("hero.stat1.label") },
              { value: t("hero.stat2.value"), label: t("hero.stat2.label") },
              { value: t("hero.stat3.value"), label: t("hero.stat3.label") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-900 leading-none" style={{ color: "var(--bfh-yellow)" }}>
                  {stat.value}
                </div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Supported by */}
          <div
            className="flex flex-wrap items-center gap-6 mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
          >
            <span className="text-xs font-700 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
              {lang === "de" ? "Unterstützt durch" : "Supported by"}
            </span>
            {[
              { name: "Berner Fachhochschule", domain: "bfh.ch" },
              { name: "Innosuisse", domain: "innosuisse.ch" },
            ].map(({ name, domain }) => (
              <div key={domain} className="flex items-center gap-2.5 px-4 py-2 rounded" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  alt={name}
                  width={28}
                  height={28}
                  className="rounded"
                />
                <span className="text-sm font-700" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into white */}
      <div
        className="h-8 w-full"
        style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />
    </section>
  );
}
