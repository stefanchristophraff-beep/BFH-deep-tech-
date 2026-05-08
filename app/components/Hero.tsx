"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        {/* Radar rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-10">
          {[300, 220, 140, 60].map((size) => (
            <div
              key={size}
              className="absolute border border-cyan-400 rounded-full"
              style={{
                width: size,
                height: size,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <div className="absolute w-2 h-2 bg-cyan-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {/* Radar blip dots */}
          {[
            { top: "30%", left: "60%", delay: "0s" },
            { top: "65%", left: "72%", delay: "0.5s" },
            { top: "45%", left: "38%", delay: "1s" },
            { top: "22%", left: "50%", delay: "1.5s" },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full animate-pulse"
              style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
            />
          ))}
        </div>
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-sm font-medium">
              {t("hero.badge")} — Living Database
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {t("hero.title")
              .split("Schweiz")
              .map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      Schweiz
                    </span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100/80 mb-10 leading-relaxed max-w-2xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => scrollTo("radar")}
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              {t("hero.cta.primary")}
            </button>
            <button
              onClick={() => scrollTo("feedback")}
              className="border border-blue-400/40 hover:border-blue-400/70 text-blue-200 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:bg-white/5"
            >
              {t("hero.cta.secondary")}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              {
                value: t("hero.stat1.value"),
                label: t("hero.stat1.label"),
              },
              {
                value: t("hero.stat2.value"),
                label: t("hero.stat2.label"),
              },
              {
                value: t("hero.stat3.value"),
                label: t("hero.stat3.label"),
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-blue-300 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-blue-400/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
