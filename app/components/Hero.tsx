"use client";

import { useLanguage } from "@/app/context/LanguageContext";

// Switzerland border outline — derived from geographic coordinates (clockwise from NW)
// ViewBox: 0 0 570 340
const SWITZERLAND_PATH = [
  "M 67 62",    // Jura NW
  "L 109 41",   // Rhine NW
  "L 170 41",   // Rhine W
  "L 196 0",    // Schaffhausen bump (north protrusion)
  "L 314 0",    // Rhine E
  "L 344 31",   // Lake Constance approach
  "L 423 37",   // Lake Constance E
  "L 442 44",   // NE corner
  "L 451 96",   // E border going south
  "L 432 122",  // Liechtenstein notch (slight west)
  "L 492 113",  // Engadin protrusion (east ear)
  "L 543 152",  // SE tip — Martina/Inn valley
  "L 500 202",  // SE continuing SW
  "L 420 266",  // Approaching Ticino
  "L 367 320",  // Ticino — southernmost point
  "L 337 266",  // Locarno heading NW
  "L 310 232",  // Maggiore area
  "L 259 296",  // Formazza — deep south valley
  "L 241 232",  // Simplon area
  "L 145 313",  // Great St. Bernard — SW deep valley
  "L 126 252",  // Rhône valley W
  "L 97 218",   // Vaud/Valais
  "L 47 232",   // Geneva E shore
  "L 16 234",   // Geneva — westernmost point
  "L 16 201",   // Geneva N shore
  "L 33 160",   // Nyon area
  "L 48 124",   // Jura S
  "L 33 83",    // Jura middle
  "Z",
].join(" ");

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
      {/* Switzerland map — decorative background, right-aligned */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-end"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 570 340"
          preserveAspectRatio="xMidYMid meet"
          className="h-[90%] w-auto"
          style={{ transform: "translateX(8%)", opacity: 0.12 }}
        >
          <path
            d={SWITZERLAND_PATH}
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
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
                <div
                  className="text-3xl font-900 leading-none"
                  style={{ color: "var(--bfh-yellow)" }}
                >
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
