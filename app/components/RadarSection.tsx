"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { AirtableProgram } from "@/app/api/programs/route";

export default function RadarSection() {
  const { lang, t } = useLanguage();
  const [programs, setPrograms] = useState<AirtableProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCluster, setActiveCluster] = useState("all");
  const [activePhase, setActivePhase] = useState("all");

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Derive unique clusters + phases from data
  const clusters = useMemo(() => {
    const vals = programs
      .map((p) => p.cluster)
      .filter(Boolean)
      .flatMap((c) => c.split(",").map((s) => s.trim()))
      .filter(Boolean);
    return ["all", ...Array.from(new Set(vals)).sort()];
  }, [programs]);

  const phases = useMemo(() => {
    const vals = programs
      .map((p) => p.phase)
      .filter(Boolean)
      .flatMap((p) => p.split(",").map((s) => s.trim()))
      .filter(Boolean);
    return ["all", ...Array.from(new Set(vals)).sort()];
  }, [programs]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return programs.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.offerings.toLowerCase().includes(q) ||
        p.targetGroup.toLowerCase().includes(q) ||
        p.cluster.toLowerCase().includes(q);

      const matchesCluster =
        activeCluster === "all" ||
        p.cluster
          .split(",")
          .map((s) => s.trim())
          .includes(activeCluster);

      const matchesPhase =
        activePhase === "all" ||
        p.phase
          .split(",")
          .map((s) => s.trim())
          .includes(activePhase);

      return matchesSearch && matchesCluster && matchesPhase;
    });
  }, [search, activeCluster, activePhase, programs]);

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
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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

        {/* Filters */}
        {!loading && !error && (
          <div className="space-y-3 mb-8">
            {/* Cluster filter */}
            <div className="flex flex-wrap gap-2">
              {clusters.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCluster(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activeCluster === c
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {c === "all"
                    ? lang === "de"
                      ? "Alle Cluster"
                      : "All Clusters"
                    : c}
                </button>
              ))}
            </div>
            {/* Phase filter */}
            <div className="flex flex-wrap gap-2">
              {phases.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePhase(p)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activePhase === p
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-600"
                  }`}
                >
                  {p === "all"
                    ? lang === "de"
                      ? "Alle Phasen"
                      : "All Phases"
                    : p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <svg className="w-8 h-8 animate-spin mb-3 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {lang === "de" ? "Lade Programme…" : "Loading programs…"}
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">
            {lang === "de"
              ? "Fehler beim Laden. Bitte Seite neu laden."
              : "Error loading data. Please refresh the page."}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="text-sm text-gray-400 mb-4">
              {filtered.length}{" "}
              {lang === "de" ? "Programme gefunden" : "programs found"}
            </div>

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
                  <ProgramCard key={program.id} program={program} lang={lang} t={t} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  lang,
  t,
}: {
  program: AirtableProgram;
  lang: string;
  t: (k: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-100 transition-all flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
            {program.name}
          </h3>
          {program.organization && (
            <p className="text-sm text-gray-400 mt-0.5">{program.organization}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {program.deeptechSpecific && (
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              🔬 Deep Tech
            </span>
          )}
          {program.accessibleToAllFounders && (
            <span className="text-xs font-semibold bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
              ✓ {lang === "de" ? "Alle Gründer" : "All founders"}
            </span>
          )}
        </div>
      </div>

      {/* Cluster + Phase badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {program.cluster && (
          <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-lg font-medium">
            {program.cluster}
          </span>
        )}
        {program.phase && (
          <span className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded-lg font-medium">
            📍 {program.phase}
          </span>
        )}
      </div>

      {/* Purpose */}
      {program.purpose && (
        <p className={`text-sm text-gray-600 leading-relaxed flex-1 mb-3 ${expanded ? "" : "line-clamp-3"}`}>
          {program.purpose}
        </p>
      )}

      {/* Offerings */}
      {program.offerings && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            {lang === "de" ? "Angebot" : "Offerings"}
          </p>
          <p className={`text-sm text-gray-600 ${expanded ? "" : "line-clamp-2"}`}>
            {program.offerings}
          </p>
        </div>
      )}

      {/* Target group */}
      {program.targetGroup && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            {lang === "de" ? "Zielgruppe" : "Target Group"}
          </p>
          <p className="text-sm text-gray-600">{program.targetGroup}</p>
        </div>
      )}

      {/* Remarks (expanded only) */}
      {expanded && program.remarks && (
        <div className="mb-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-xs font-semibold text-amber-700 mb-1">
            {lang === "de" ? "Hinweise" : "Remarks"}
          </p>
          <p className="text-sm text-amber-800">{program.remarks}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {expanded
            ? lang === "de" ? "Weniger anzeigen ↑" : "Show less ↑"
            : lang === "de" ? "Mehr anzeigen ↓" : "Show more ↓"}
        </button>

        {program.hyperlink && (
          <a
            href={program.hyperlink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            {t("radar.cta")}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
