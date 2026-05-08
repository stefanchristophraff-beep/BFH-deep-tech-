"use client";

import { useLanguage } from "@/app/context/LanguageContext";

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
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative pt-16 overflow-hidden"
      style={{ backgroundColor: "var(--bfh-navy)" }}
    >
      {/* Switzerland outline — decorative background */}
      <svg
        viewBox="-10 -20 1030 610"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full"
        style={{ opacity: 0.1 }}
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

          <h1 className="flex items-center gap-4 text-4xl sm:text-5xl lg:text-6xl font-900 leading-tight mb-6 text-white">
            <span>{t("hero.title")}</span>
            <svg
              width="120"
              height="120"
              viewBox="0 0 32 32"
              aria-label="Schweizer Flagge"
              className="shrink-0"
            >
              <rect width="32" height="32" fill="#FF0000" />
              <rect x="6" y="13" width="20" height="6" fill="#FFFFFF" />
              <rect x="13" y="6" width="6" height="20" fill="#FFFFFF" />
            </svg>
          </h1>

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
