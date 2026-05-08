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
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white text-left transition-colors"
        style={{ border: "1px solid var(--bfh-border)", color: selected.length === 0 ? "var(--bfh-muted)" : "var(--bfh-dark)" }}
      >
        <span>{displayText}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          style={{ color: "var(--bfh-muted)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && options.length > 0 && (
        <div className="absolute z-20 w-full mt-0.5 bg-white shadow-md max-h-60 overflow-y-auto" style={{ border: "1px solid var(--bfh-border)" }}>
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-[#f5f6f8]">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="border-gray-300" />
              <span style={{ color: "var(--bfh-body)" }}>{opt}</span>
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

      const matchesDeeptech = !deeptechOnly || p.deeptechSpecific;

      return (
        matchesSearch &&
        matchesPhase &&
        matchesCluster &&
        matchesSkills &&
        matchesOfferings &&
        matchesDeeptech
      );
    });
  }, [
    search,
    activePhases,
    selectedClusters,
    selectedSkills,
    selectedOfferings,
    deeptechOnly,
    programs,
  ]);

  return (
    <section id="radar" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>
            {t("radar.title")}
          </h2>
          <p className="text-lg" style={{ color: "var(--bfh-blue)" }}>
            {t("radar.subtitle")}
          </p>
        </div>

        {/* Search + Filters toggle */}
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--bfh-muted)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetScroll(); }}
              placeholder={t("radar.search.placeholder")}
              className="w-full pl-12 pr-4 py-3 text-base focus:outline-none"
              style={{
                border: "1px solid var(--bfh-border)",
                backgroundColor: "var(--bfh-surface)",
                color: "var(--bfh-dark)",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--bfh-muted)" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-600 transition-colors"
            style={{
              border: hasActiveFilters ? "1px solid var(--bfh-navy)" : "1px solid var(--bfh-border)",
              backgroundColor: hasActiveFilters ? "var(--bfh-navy)" : "white",
              color: hasActiveFilters ? "white" : "var(--bfh-body)",
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {lang === "de" ? "Filter" : "Filters"}
            {hasActiveFilters && (
              <span className="text-xs rounded-full w-5 h-5 flex items-center justify-center font-700" style={{ backgroundColor: "var(--bfh-yellow)", color: "var(--bfh-dark)" }}>
                {activePhases.length + selectedClusters.length + selectedSkills.length + selectedOfferings.length + (deeptechOnly ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {!loading && !error && filtersOpen && (
          <div className="p-5 mb-6" style={{ backgroundColor: "var(--bfh-surface)", borderLeft: "4px solid var(--bfh-yellow)", border: "1px solid var(--bfh-border)", borderLeftWidth: "4px", borderLeftColor: "var(--bfh-yellow)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Phase */}
              <div>
                <p className="text-xs font-700 mb-2 uppercase tracking-wide" style={{ color: "var(--bfh-muted)" }}>Phase (TRL/MRL)</p>
                <div className="flex flex-wrap gap-2">
                  {PHASES.map((ph) => (
                    <button
                      key={ph.value}
                      type="button"
                      onClick={() => togglePhase(ph.value)}
                      className="px-3 py-1.5 text-sm font-600 transition-colors"
                      style={
                        activePhases.includes(ph.value)
                          ? { backgroundColor: "var(--bfh-navy)", color: "#fff", border: "1px solid var(--bfh-navy)" }
                          : { backgroundColor: "#fff", color: "var(--bfh-body)", border: "1px solid var(--bfh-border)" }
                      }
                    >
                      {ph.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-700 mb-2 uppercase tracking-wide" style={{ color: "var(--bfh-muted)" }}>
                  {lang === "de" ? "Vermarktungskompetenzen" : "Commercialisation Skills"}
                </p>
                <MultiSelectDropdown options={skillOptions} selected={selectedSkills} onChange={(v) => { setSelectedSkills(v); resetScroll(); }} placeholder={lang === "de" ? "Kompetenzen auswählen..." : "Select skills..."} />
              </div>

              {/* Cluster */}
              <div>
                <p className="text-xs font-700 mb-2 uppercase tracking-wide" style={{ color: "var(--bfh-muted)" }}>Cluster</p>
                <MultiSelectDropdown options={clusterOptions} selected={selectedClusters} onChange={(v) => { setSelectedClusters(v); resetScroll(); }} placeholder={lang === "de" ? "Cluster auswählen..." : "Select clusters..."} />
              </div>

              {/* Offerings */}
              <div>
                <p className="text-xs font-700 mb-2 uppercase tracking-wide" style={{ color: "var(--bfh-muted)" }}>
                  {lang === "de" ? "Angebote" : "Offerings"}
                </p>
                <MultiSelectDropdown options={offeringOptions} selected={selectedOfferings} onChange={(v) => { setSelectedOfferings(v); resetScroll(); }} placeholder={lang === "de" ? "Angebote auswählen..." : "Select offerings..."} />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mt-5 pt-4" style={{ borderTop: "1px solid var(--bfh-border)" }}>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-600" style={{ color: "var(--bfh-body)" }}>
                <input type="checkbox" checked={deeptechOnly} onChange={(e) => { setDeeptechOnly(e.target.checked); resetScroll(); }} />
                {lang === "de" ? "Deep-Tech spezifische Programme" : "Deep-Tech specific programs"}
              </label>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 text-right">
                <button
                  onClick={() => { setActivePhases([]); setSelectedClusters([]); setSelectedSkills([]); setSelectedOfferings([]); setDeeptechOnly(false); resetScroll(); }}
                  className="text-xs underline transition-colors"
                  style={{ color: "var(--bfh-blue)" }}
                >
                  {lang === "de" ? "Filter zurücksetzen" : "Reset filters"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24" style={{ color: "var(--bfh-muted)" }}>
            <svg className="w-8 h-8 animate-spin mb-3" fill="none" viewBox="0 0 24 24" style={{ color: "var(--bfh-blue)" }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {lang === "de" ? "Lade Programme…" : "Loading programs…"}
          </div>
        )}

        {error && (
          <div className="text-center py-20" style={{ color: "#dc2626" }}>
            {lang === "de" ? "Fehler beim Laden. Bitte Seite neu laden." : "Error loading data. Please refresh the page."}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="text-sm font-600 mb-4" style={{ color: "var(--bfh-blue)" }}>
              {filtered.length} {lang === "de" ? "Programme gefunden" : "programs found"}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20" style={{ color: "var(--bfh-muted)" }}>
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("radar.noresults")}
              </div>
            ) : (
              <div className="relative">
                <div ref={scrollRef} className="overflow-y-auto pr-1" style={{ maxHeight: "740px" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    {filtered.map((program) => (
                      <ProgramCard key={program.id} program={program} lang={lang} t={t} />
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function getLogoDomain(hyperlink: string): string | null {
  try {
    return new URL(hyperlink).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function OrgLogo({ hyperlink, name }: { hyperlink: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const domain = getLogoDomain(hyperlink);

  if (!domain || failed) {
    return (
      <div
        className="w-8 h-8 rounded flex items-center justify-center shrink-0 text-xs font-700"
        style={{ backgroundColor: "var(--bfh-surface)", color: "var(--bfh-muted)", border: "1px solid var(--bfh-border)" }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={32}
      height={32}
      className="w-8 h-8 rounded object-contain shrink-0"
      style={{ border: "1px solid var(--bfh-border)", backgroundColor: "#fff" }}
      onError={() => setFailed(true)}
    />
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
    <div
      className="group bg-white flex flex-col transition-shadow hover:shadow-sm"
      style={{
        borderTop: "3px solid var(--bfh-yellow)",
        border: "1px solid var(--bfh-border)",
        borderTopWidth: "3px",
        borderTopColor: "var(--bfh-yellow)",
      }}
    >
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {program.hyperlink && (
            <OrgLogo hyperlink={program.hyperlink} name={program.organization || program.name} />
          )}
          <div className="min-w-0">
            <h3
              className="font-700 text-base leading-snug transition-colors"
              style={{ color: "var(--bfh-dark)" }}
            >
              {program.name}
            </h3>
            {program.organization && (
              <p className="text-sm mt-0.5" style={{ color: "var(--bfh-muted)" }}>
                {program.organization}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {program.phase && program.phase.split(",").map((ph) => (
            <span
              key={ph}
              className="text-xs font-600 px-2 py-0.5"
              style={{ backgroundColor: "var(--bfh-blue-light)", color: "var(--bfh-blue)", border: "1px solid rgba(74,126,181,0.2)" }}
            >
              {ph.trim()}
            </span>
          ))}
          {program.cluster && program.cluster.split(",").slice(0, 2).map((cl) => (
            <span
              key={cl}
              className="text-xs font-600 px-2 py-0.5"
              style={{ backgroundColor: "var(--bfh-surface)", color: "var(--bfh-body)", border: "1px solid var(--bfh-border)" }}
            >
              {cl.trim()}
            </span>
          ))}
          {program.deeptechSpecific && (
            <span className="text-xs font-600 px-2 py-0.5" style={{ backgroundColor: "var(--bfh-blue-light)", color: "var(--bfh-navy)", border: "1px solid rgba(30,61,92,0.15)" }}>
              Deep Tech
            </span>
          )}
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-3 mb-3">
            {program.offerings && (
              <div>
                <p className="text-xs font-700 uppercase tracking-wide mb-0.5" style={{ color: "var(--bfh-muted)" }}>
                  {lang === "de" ? "Angebot" : "Offerings"}
                </p>
                <p className="text-sm" style={{ color: "var(--bfh-body)" }}>{program.offerings}</p>
              </div>
            )}
            {program.targetGroup && (
              <div>
                <p className="text-xs font-700 uppercase tracking-wide mb-0.5" style={{ color: "var(--bfh-muted)" }}>
                  {lang === "de" ? "Zielgruppe" : "Target Group"}
                </p>
                <p className="text-sm" style={{ color: "var(--bfh-body)" }}>{program.targetGroup}</p>
              </div>
            )}
            {program.remarks && (
              <div className="p-3" style={{ backgroundColor: "rgba(240,180,41,0.08)", borderLeft: "3px solid var(--bfh-yellow)" }}>
                <p className="text-xs font-700 mb-0.5" style={{ color: "var(--bfh-navy)" }}>
                  {lang === "de" ? "Hinweise" : "Remarks"}
                </p>
                <p className="text-sm" style={{ color: "var(--bfh-body)" }}>{program.remarks}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: "1px solid var(--bfh-border)" }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-600 transition-colors"
            style={{ color: "var(--bfh-blue)" }}
          >
            {expanded
              ? lang === "de" ? "Weniger ↑" : "Less ↑"
              : lang === "de" ? "Details ↓" : "Details ↓"}
          </button>

          {program.hyperlink && (
            <a
              href={program.hyperlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-600 flex items-center gap-1 transition-colors"
              style={{ color: "var(--bfh-navy)" }}
            >
              {t("radar.cta")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
