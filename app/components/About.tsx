"use client";

import { useLanguage } from "@/app/context/LanguageContext";

const icons = {
  compass: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  refresh: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

export default function About() {
  const { t } = useLanguage();

  const cards = [
    { icon: icons.compass, title: t("about.card1.title"), desc: t("about.card1.desc") },
    { icon: icons.search,  title: t("about.card2.title"), desc: t("about.card2.desc") },
    { icon: icons.refresh, title: t("about.card3.title"), desc: t("about.card3.desc") },
    { icon: icons.star,    title: t("about.card4.title"), desc: t("about.card4.desc") },
  ];

  return (
    <section id="about" className="py-24" style={{ backgroundColor: "var(--bfh-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            className="text-3xl sm:text-4xl font-700 mb-3"
            style={{ color: "var(--bfh-dark)" }}
          >
            {t("about.title")}
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "var(--bfh-blue)" }}>
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 border-t-4 transition-shadow hover:shadow-sm"
              style={{ borderTopColor: "var(--bfh-yellow)", borderLeft: "1px solid var(--bfh-border)", borderRight: "1px solid var(--bfh-border)", borderBottom: "1px solid var(--bfh-border)" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ color: "var(--bfh-navy)" }}
              >
                {card.icon}
              </div>
              <h3
                className="font-700 mb-2 text-base"
                style={{ color: "var(--bfh-dark)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bfh-muted)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BFH Banner */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-6 p-8 border-l-4 bg-white"
          style={{
            borderLeftColor: "var(--bfh-navy)",
            borderTop: "1px solid var(--bfh-border)",
            borderRight: "1px solid var(--bfh-border)",
            borderBottom: "1px solid var(--bfh-border)",
          }}
        >
          <div className="flex items-center gap-4 shrink-0">
            <div
              className="w-14 h-14 flex items-center justify-center rounded-sm"
              style={{ backgroundColor: "var(--bfh-navy)" }}
            >
              <span
                className="font-900 text-base"
                style={{ color: "var(--bfh-yellow)" }}
              >
                BFH
              </span>
            </div>
            <div>
              <div className="font-700" style={{ color: "var(--bfh-dark)" }}>
                Berner Fachhochschule
              </div>
              <div className="text-sm" style={{ color: "var(--bfh-muted)" }}>
                Institute for Digital Technology Management
              </div>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12" style={{ backgroundColor: "var(--bfh-border)" }} />
          <p className="text-sm text-center sm:text-left max-w-md" style={{ color: "var(--bfh-body)" }}>
            Der Startup Radar wird von der BFH entwickelt und unterstützt Gründerinnen und Gründer beim
            Navigieren des Schweizer Startup-Ökosystems.
          </p>
        </div>
      </div>
    </section>
  );
}
