"use client";

import { useLanguage } from "@/app/context/LanguageContext";

// Simplified outline of Switzerland (clockwise from Basel, key border points)
const SWITZERLAND_PATH =
  "M 178 25 L 222 18 L 268 10 L 310 5 L 355 0 L 388 8 L 400 38 L 392 68 L 390 85 L 430 100 L 478 112 L 448 158 L 415 178 L 368 230 L 340 252 L 308 248 L 285 205 L 258 225 L 220 238 L 178 242 L 138 240 L 82 228 L 22 202 L 12 188 L 28 165 L 48 128 L 48 100 L 55 72 L 108 48 Z";

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
      {/* Switzerland map — decorative background */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none">
        <svg
          viewBox="0 0 500 260"
          className="h-full w-auto opacity-[0.07]"
          style={{ minWidth: "600px", transform: "translateX(15%) translateY(5%)" }}
          aria-hidden="true"
        >
          {/* Filled shape */}
          <path
            d={SWITZERLAND_PATH}
            fill="white"
          />
          {/* Outline on top */}
          <path
            d={SWITZERLAND_PATH}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>

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

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-900 leading-tight mb-6 text-white">
            {t("hero.title")}
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
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", backgroundColor: "transparent" }}
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
      <div className="h-8 w-full" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
    </section>
  );
}
