"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { AirtableProgram } from "@/app/api/programs/route";

const PHASES = [
  { label: "Early Stage (1-3)", value: "Early Stage (1-3)" },
  { label: "Mid Stage (4-6)", value: "Mid Stage (4-6)" },
  { label: "Later Stage (7-9)", value: "Later Stage (7-9)" },
];

function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const displayText =
    selected.length === 0
      ? placeholder
      : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded bg-white text-left hover:border-gray-400 transition-colors"
      >
        <span className={selected.length === 0 ? "text-gray-400" : "text-gray-800"}>
          {displayText}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && options.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="rounded border-gray-300"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function extractUniqueValues(programs: AirtableProgram[], field: keyof AirtableProgram): string[] {
  const vals = programs
    .map((p) => p[field] as string)
    .filter(Boolean)
    .flatMap((v) => v.split(",").map((s) => s.trim()))
    .filter(Boolean);
  return Array.from(new Set(vals)).sort();
}

export default function RadarSection() {
  const { lang, t } = useLanguage();
  const [programs, setPrograms] = useState<AirtableProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Filter state
  const [search, setSearch] = useState("");
  const [activePhases, setActivePhases] = useState<string[]>([]);
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [accessibleToAll, setAccessibleToAll] = useState(false);
  const [deeptechOnly, setDeeptechOnly] = useState(false);

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const resetScroll = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  const clusterOptions = useMemo(() => extractUniqueValues(programs, "cluster"), [programs]);
  const skillOptions = useMemo(() => extractUniqueValues(programs, "commercialisationSkills"), [programs]);
  const offeringOptions = useMemo(() => extractUniqueValues(programs, "offerings"), [programs]);

  const togglePhase = (phase: string) => {
    setActivePhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
    resetScroll();
  };

  const hasActiveFilters =
    activePhases.length > 0 ||
    selectedClusters.length > 0 ||
    selectedSkills.length > 0 ||
    selectedOfferings.length > 0 ||
    accessibleToAll ||
    deeptechOnly;

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
        p.cluster.toLowerCase().includes(q) ||
        p.commercialisationSkills.toLowerCase().includes(q);

      const programPhases = p.phase.split(",").map((s) => s.trim());
      const matchesPhase =
        activePhases.length === 0 ||
        activePhases.some((ph) => programPhases.includes(ph));

      const programClusters = p.cluster.split(",").map((s) => s.trim());
      const matchesCluster =
        selectedClusters.length === 0 ||
        selectedClusters.some((c) => programClusters.includes(c));

      const programSkills = p.commercialisationSkills.split(",").map((s) => s.trim());
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((sk) => programSkills.includes(sk));

      const programOfferings = p.offerings.split(",").map((s) => s.trim());
      const matchesOfferings =
        selectedOfferings.length === 0 ||
        selectedOfferings.some((o) => programOfferings.includes(o));

      const matchesAccessible = !accessibleToAll || p.accessibleToAllFounders;
      const matchesDeeptech = !deeptechOnly || p.deeptechSpecific;

      return (
        matchesSearch &&
        matchesPhase &&
        matchesCluster &&
        matchesSkills &&
        matchesOfferings &&
        matchesAccessible &&
        matchesDeeptech
      );
    });
  }, [
    search,
    activePhases,
    selectedClusters,
    selectedSkills,
    selectedOfferings,
    accessibleToAll,
    deeptechOnly,
    programs,
  ]);

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

        {/* Search + Filters toggle */}
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
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
              onChange={(e) => { setSearch(e.target.value); resetScroll(); }}
              placeholder={t("radar.search.placeholder")}
              className="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50 placeholder:text-gray-400"
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
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium transition-all ${
              hasActiveFilters
                ? "border-blue-400 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            {lang === "de" ? "Filter" : "Filters"}
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activePhases.length +
                  selectedClusters.length +
                  selectedSkills.length +
                  selectedOfferings.length +
                  (accessibleToAll ? 1 : 0) +
                  (deeptechOnly ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {!loading && !error && filtersOpen && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Phase */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {lang === "de" ? "Phase (TRL/MRL)" : "Phase (TRL/MRL)"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PHASES.map((ph) => (
                    <button
                      key={ph.value}
                      type="button"
                      onClick={() => togglePhase(ph.value)}
                      className={`px-3 py-1.5 rounded border text-sm font-medium transition-all ${
                        activePhases.includes(ph.value)
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {ph.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commercialisation Skills */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {lang === "de" ? "Vermarktungskompetenzen" : "Commercialisation Skills"}
                </p>
                <MultiSelectDropdown
                  options={skillOptions}
                  selected={selectedSkills}
                  onChange={(v) => { setSelectedSkills(v); resetScroll(); }}
                  placeholder={lang === "de" ? "Kompetenzen auswählen..." : "Select skills..."}
                />
              </div>

              {/* Cluster */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {lang === "de" ? "Cluster" : "Cluster"}
                </p>
                <MultiSelectDropdown
                  options={clusterOptions}
                  selected={selectedClusters}
                  onChange={(v) => { setSelectedClusters(v); resetScroll(); }}
                  placeholder={lang === "de" ? "Cluster auswählen..." : "Select clusters..."}
                />
              </div>

              {/* Offerings */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {lang === "de" ? "Angebote" : "Offerings"}
                </p>
                <MultiSelectDropdown
                  options={offeringOptions}
                  selected={selectedOfferings}
                  onChange={(v) => { setSelectedOfferings(v); resetScroll(); }}
                  placeholder={lang === "de" ? "Angebote auswählen..." : "Select offerings..."}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={accessibleToAll}
                  onChange={(e) => { setAccessibleToAll(e.target.checked); resetScroll(); }}
                  className="rounded border-gray-300"
                />
                {lang === "de" ? "Zugänglich für alle Gründer" : "Accessible to all founders"}
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={deeptechOnly}
                  onChange={(e) => { setDeeptechOnly(e.target.checked); resetScroll(); }}
                  className="rounded border-gray-300"
                />
                {lang === "de" ? "Nur Deep-Tech spezifisch" : "Deep-Tech specific only"}
              </label>
            </div>

            {/* Reset filters */}
            {hasActiveFilters && (
              <div className="mt-3 text-right">
                <button
                  onClick={() => {
                    setActivePhases([]);
                    setSelectedClusters([]);
                    setSelectedSkills([]);
                    setSelectedOfferings([]);
                    setAccessibleToAll(false);
                    setDeeptechOnly(false);
                    resetScroll();
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  {lang === "de" ? "Filter zurücksetzen" : "Reset filters"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
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
            <div className="text-sm text-blue-600 mb-4">
              {filtered.length}{" "}
              {lang === "de" ? "Programme gefunden" : "programs found"}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("radar.noresults")}
              </div>
            ) : (
              <div className="relative">
                <div
                  ref={scrollRef}
                  className="overflow-y-auto pr-1"
                  style={{ maxHeight: "740px" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-4">
                    {filtered.map((program) => (
                      <ProgramCard key={program.id} program={program} lang={lang} t={t} />
                    ))}
                  </div>
                </div>
                {/* fade hint at bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
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
