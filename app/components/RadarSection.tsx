"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { DEMO_PROGRAMS, ProgramCategory, ProgramStatus } from "@/app/data/programs";

const STATUS_COLORS: Record<ProgramStatus, string> = {
  open: "bg-green-100 text-green-700 border-green-200",
  ongoing: "bg-blue-100 text-blue-700 border-blue-200",
  closed: "bg-gray-100 text-gray-500 border-gray-200",
};

const CATEGORY_COLORS: Record<ProgramCategory, string> = {
  funding: "bg-yellow-50 border-yellow-200 text-yellow-700",
  accelerator: "bg-purple-50 border-purple-200 text-purple-700",
  network: "bg-cyan-50 border-cyan-200 text-cyan-700",
  research: "bg-green-50 border-green-200 text-green-700",
  cantonal: "bg-orange-50 border-orange-200 text-orange-700",
};

const CATEGORY_ICONS: Record<ProgramCategory, string> = {
  funding: "💰",
  accelerator: "🚀",
  network: "🔗",
  research: "🔬",
  cantonal: "🏔",
};

type FilterCategory = ProgramCategory | "all";

export default function RadarSection() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: t("radar.filter.all") },
    { key: "funding", label: t("radar.filter.funding") },
    { key: "accelerator", label: t("radar.filter.accelerator") },
    { key: "network", label: t("radar.filter.network") },
    { key: "research", label: t("radar.filter.research") },
    { key: "cantonal", label: t("radar.filter.cantonal") },
  ];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return DEMO_PROGRAMS.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q) ||
        p.description[lang].toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, lang]);

  const statusLabel = (status: ProgramStatus) => {
    const map: Record<ProgramStatus, string> = {
      open: t("radar.tag.open"),
      ongoing: t("radar.tag.ongoing"),
      closed: t("radar.tag.closed"),
    };
    return map[status];
  };

  return (
    <section id="radar" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {t("radar.title")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t("radar.subtitle")}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t("radar.airtable.hint")}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("radar.search.placeholder")}
            className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50 placeholder:text-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveCategory(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === f.key
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {f.key !== "all" && (
                <span className="mr-1.5">{CATEGORY_ICONS[f.key as ProgramCategory]}</span>
              )}
              {f.label}
              {f.key === "all" && (
                <span className="ml-1.5 text-xs opacity-70">({DEMO_PROGRAMS.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-400 mb-4">
          {filtered.length} {lang === "de" ? "Programme gefunden" : "programs found"}
        </div>

        {/* Program grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t("radar.noresults")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((program) => (
              <div
                key={program.id}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-100 transition-all flex flex-col"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">{program.provider}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[program.status]}`}
                  >
                    {statusLabel(program.status)}
                  </span>
                </div>

                {/* Category badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${CATEGORY_COLORS[program.category]}`}
                  >
                    <span>{CATEGORY_ICONS[program.category]}</span>
                    {filters.find((f) => f.key === program.category)?.label}
                  </span>
                  {program.canton && (
                    <span className="ml-2 text-xs text-gray-400 font-medium">
                      🏔 {program.canton}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4 line-clamp-3">
                  {program.description[lang]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {program.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="text-sm">
                    {program.funding && (
                      <span className="font-semibold text-green-700">
                        {program.funding}
                      </span>
                    )}
                    {program.deadline && (
                      <span className="text-gray-400 text-xs ml-2">
                        ⏱ {program.deadline}
                      </span>
                    )}
                  </div>
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    {t("radar.cta")}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
