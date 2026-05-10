"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const MEMBERS = [
  {
    name: "Donat Rüttimann",
    role: "Projektkoordinator Start-up & Innovationsprojekte",
    org: "Innosuisse",
    img: "/donatbild.jpg",
    initials: "DR",
  },
  {
    name: "Stefan Raff-Heinen",
    role: "Professor",
    org: "Berner Fachhochschule",
    img: "/stefanbild.jpg",
    initials: "SR",
    email: "stefan.raff@bfh.ch",
    scholar: "https://scholar.google.co.il/citations?user=g2lrPqQAAAAJ&hl=de",
  },
];

function Avatar({ src, initials, name }: { src: string; initials: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center text-2xl font-700 shrink-0"
        style={{ backgroundColor: "var(--bfh-navy)", color: "var(--bfh-yellow)" }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden shrink-0" style={{ border: "3px solid var(--bfh-yellow)" }}>
      <Image
        src={src}
        alt={name}
        width={128}
        height={128}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function Team() {
  const { lang } = useLanguage();

  return (
    <section id="team" className="py-24 bg-white" style={{ borderTop: "1px solid var(--bfh-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>
            {lang === "de" ? "Das Team" : "The Team"}
          </h2>
          <p className="text-lg" style={{ color: "var(--bfh-blue)" }}>
            {lang === "de"
              ? "Die Personen hinter dem Deep-Tech Support Navigator"
              : "The people behind the Deep-Tech Support Navigator"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          {MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-6 p-6 bg-white"
              style={{
                borderTop: "3px solid var(--bfh-yellow)",
                border: "1px solid var(--bfh-border)",
                borderTopWidth: "3px",
                borderTopColor: "var(--bfh-yellow)",
                flex: 1,
              }}
            >
              <Avatar src={m.img} initials={m.initials} name={m.name} />
              <div>
                <div className="font-700 text-lg leading-tight" style={{ color: "var(--bfh-dark)" }}>
                  {m.name}
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--bfh-body)" }}>
                  {m.role}
                </div>
                <div
                  className="inline-block text-xs font-600 mt-2 px-2 py-0.5"
                  style={{
                    backgroundColor: "var(--bfh-blue-light)",
                    color: "var(--bfh-blue)",
                    border: "1px solid rgba(74,126,181,0.2)",
                  }}
                >
                  @{m.org}
                </div>
                {"email" in m && m.email && (
                  <div className="mt-2">
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs"
                      style={{ color: "var(--bfh-blue)" }}
                    >
                      {m.email}
                    </a>
                  </div>
                )}
                {"scholar" in m && m.scholar && (
                  <div className="mt-2">
                    <a
                      href={m.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-600 transition-colors"
                      style={{ color: "var(--bfh-blue)" }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                      </svg>
                      Google Scholar
                    </a>
                  </div>
                )}
              </div>
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
            <a href="https://www.bfh.ch/de/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/BFH_Logo_C_en_100_RGB.png"
                alt="BFH – Bern University of Applied Sciences"
                width={110}
                height={44}
                className="h-12 w-auto object-contain"
              />
            </a>
            <div>
              <a
                href="https://www.bfh.ch/de/forschung/forschungsbereiche/digital-technology-management/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-700 hover:underline"
                style={{ color: "var(--bfh-navy)" }}
              >
                Institute for Digital Technology Management
              </a>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12" style={{ backgroundColor: "var(--bfh-border)" }} />
          <p className="text-sm text-center sm:text-left max-w-md" style={{ color: "var(--bfh-body)" }}>
            Der Deep-Tech Support Navigator wurde im Rahmen einer Masterthesis strukturiert entwickelt und unterstützt Gründerinnen und Gründer beim
            Navigieren des Schweizer Startup-Ökosystems.
          </p>
        </div>
      </div>
    </section>
  );
}
