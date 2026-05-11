"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const FAQ_DE = [
  {
    q: "Was ist der Deep-Tech Support Navigator?",
    a: "Der Deep-Tech Support Navigator ist ein interaktives Tool, das entwickelt wurde, um die Schweizer Unterstützungslandschaft für Deep-Tech-Startups systematisch zu kartieren und transparent zu machen. Er bietet eine strukturierte Übersicht über Förderangebote und ordnet diese entlang verschiedener Phasen der Unternehmensentwicklung, Angebotstypen und Technologien.",
  },
  {
    q: "Warum wurde dieses Tool entwickelt?",
    a: "Die Schweiz belegt in internationalen Innovationsrankings regelmässig Spitzenplätze – doch die Förderlandschaft selbst ist fragmentiert und für Gründerinnen und Gründer oft schwer zu durchschauen. Gerade Deep-Tech-Startups sind in ihren frühen Phasen auf gezielte Unterstützung angewiesen, sei es finanzieller, technologischer oder strategischer Natur. Tatsächlich existieren bereits mehr Angebote, als vielen Teams bewusst ist; sie bleiben jedoch häufig ungenutzt, weil sie schlicht nicht sichtbar sind. Genau hier setzt der Support Navigator an: Er schafft Transparenz über bestehende Förder- und Unterstützungsangebote und möchte damit einen Beitrag leisten, eine zentrale Orientierungslücke im Schweizer Deep-Tech-Ökosystem zu schliessen.",
  },
  {
    q: "Wer hat den Support Navigator erstellt?",
    a: "Das Tool wurde im Rahmen einer Masterthesis an der Berner Fachhochschule (BFH) entwickelt. Das Projekt entstand darüber hinaus in enger Zusammenarbeit mit der Schweizerischen Agentur für Innovationsförderung Innosuisse, die ihr Netzwerk für die empirische Analyse zur Verfügung stellte.",
  },
  {
    q: "Auf welcher Datenbasis beruht der Support Navigator?",
    a: "Für die Erstellung des Support Navigators wurden 169 Schweizer Unterstützungsprogramme systematisch analysiert. Zur Validierung der Ergebnisse wurden zudem zahlreiche qualitative Interviews mit Deep-Tech-Gründer:innen, Coaches und Innosuisse-Expert:innen geführt.",
  },
  {
    q: "Welche Rolle spielen TRL und MRL bei der Einordnung?",
    a: "Die Programme werden im Support Navigator anhand der Technology Readiness Levels (TRL) und Market Readiness Levels (MRL) strukturiert. Dies ermöglicht eine präzise Zuordnung zu den drei Phasen der Venture-Journey. Diese beiden Skalen werden genutzt, um den Reifegrad eines Startups ganzheitlich zu erfassen und die passenden Förderangebote zuzuordnen.\n\n• Technology Readiness Level (TRL): Dieser Standard wurde ursprünglich von der NASA entwickelt und dient heute als global anerkannter Standard zur Bewertung des technologischen Reifegrads. Die Skala reicht von Level 1 (Beobachtung der physikalischen Grundprinzipien) bis Level 9 (erfolgreicher Einsatz des Systems in der realen Umgebung).\n\n• Market Readiness Level (MRL): Dieses Modell misst den Fortschritt bei der Kommerzialisierung und der Anpassung an den Markt. Es beginnt bei Level 1 (Ahnung eines Marktbedürfnisses) und führt bis zu Level 9 (bestätigte Stabilität und Marktwachstum).\n\nDer Deep-Tech Support Navigator orientiert sich dabei an den wissenschaftlich fundierten Skalen von Vik et al. (2021), welche die Reifegrade präzise definieren. Durch die Kombination beider Modelle lässt sich bestimmen, ob ein Startup in die Early Stage (TRL/MRL 1–3), Mid Stage (TRL/MRL 4–6) oder Later Stage (TRL/MRL 7–9) fällt.\n\nDas detaillierte Modell und die Kriterien können Sie im zugrunde liegenden wissenschaftlichen Paper nachlesen: Vik et al. (2021): Balanced readiness level assessment (BRLa): A tool for exploring new and emerging technologies.",
  },
  {
    q: "Welche Erkenntnisse liefert der Support Navigator über die Schweizer Förderlandschaft?",
    a: "Die Analyse zeigt eine deutliche Diskrepanz: Lediglich 14 % der untersuchten Programme sind explizit auf Deep-Tech zugeschnitten. Während in der Früh- und Mittelphase (Early/Mid Stage) ein breites Angebot existiert, nimmt die Unterstützung in der kritischen späteren Wachstumsphase signifikant ab.",
  },
  {
    q: "Wie hilft der Support Navigator Gründer:innen konkret?",
    a: "Gründer:innen können die Web-Applikation nutzen, um gezielt nach Programmen zu suchen, die zu ihrer aktuellen Phase oder ihrem Technologie-Cluster (z. B. Robotics, Quantum, Medtech) passen. Zudem lässt sich filtern, welche Programme spezifische Kommerzialisierungskompetenzen wie IP-Strategie, Fundraising, Industriezugang oder Supply-Chain-Management fördern.",
  },
];

const FAQ_EN = [
  {
    q: "What is the Deep-Tech Support Navigator?",
    a: "The Deep-Tech Support Navigator is an interactive tool developed to systematically map and make transparent the Swiss support landscape for deep-tech startups. It provides a structured overview of support offerings and organises them along various phases of company development, offering types and technologies.",
  },
  {
    q: "Why was this tool developed?",
    a: "Switzerland regularly ranks at the top of international innovation rankings – yet the funding landscape itself is fragmented and often difficult for founders to navigate. Deep-tech startups in particular depend on targeted support in their early stages, whether financial, technological or strategic in nature. In fact, more offerings already exist than many teams realise; they often go unused simply because they are not visible. This is precisely where the Support Navigator comes in: it creates transparency about existing funding and support offerings and aims to help close a central orientation gap in the Swiss deep-tech ecosystem.",
  },
  {
    q: "Who created the Support Navigator?",
    a: "The tool was developed as part of a master's thesis at the Bern University of Applied Sciences (BFH). The project was also created in close collaboration with the Swiss Innovation Agency Innosuisse, which provided its network for the empirical analysis.",
  },
  {
    q: "What data is the Support Navigator based on?",
    a: "169 Swiss support programs were systematically analysed for the creation of the Support Navigator. Numerous qualitative interviews with deep-tech founders, coaches and Innosuisse experts were also conducted to validate the results.",
  },
  {
    q: "What role do TRL and MRL play in the classification?",
    a: "The programs in the Support Navigator are structured according to Technology Readiness Levels (TRL) and Market Readiness Levels (MRL). This enables a precise assignment to the three phases of the venture journey. Both scales are used to holistically assess the maturity of a startup and match it with the appropriate support offerings.\n\n• Technology Readiness Level (TRL): Originally developed by NASA, this standard is now a globally recognised benchmark for assessing technological maturity. The scale ranges from Level 1 (observation of basic physical principles) to Level 9 (successful deployment of the system in a real-world environment).\n\n• Market Readiness Level (MRL): This model measures progress in commercialisation and market adaptation. It starts at Level 1 (awareness of a market need) and extends to Level 9 (confirmed market stability and growth).\n\nThe Deep-Tech Support Navigator is based on the scientifically grounded scales of Vik et al. (2021), which precisely define the readiness levels. By combining both models, it can be determined whether a startup falls into the Early Stage (TRL/MRL 1–3), Mid Stage (TRL/MRL 4–6) or Later Stage (TRL/MRL 7–9).\n\nThe detailed model and criteria can be found in the underlying scientific paper: Vik et al. (2021): Balanced readiness level assessment (BRLa): A tool for exploring new and emerging technologies.",
  },
  {
    q: "What insights does the Support Navigator provide about the Swiss funding landscape?",
    a: "The analysis reveals a clear discrepancy: only 14% of the programs examined are explicitly tailored to deep tech. While a broad range of offerings exists in the early and mid-stage, support decreases significantly in the critical later growth phase.",
  },
  {
    q: "How does the Support Navigator concretely help founders?",
    a: "Founders can use the web application to search specifically for programs that match their current phase or technology cluster (e.g. Robotics, Quantum, Medtech). It is also possible to filter which programs promote specific commercialisation competencies such as IP strategy, fundraising, industry access or supply chain management.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--bfh-border)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-600 text-base" style={{ color: "var(--bfh-dark)" }}>
          {q}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: "var(--bfh-muted)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5">
          {(() => {
            const blocks = a.split("\n\n");
            const elements: React.ReactNode[] = [];
            let bulletBuffer: string[] = [];

            const flushBullets = (key: string) => {
              if (bulletBuffer.length === 0) return;
              elements.push(
                <ul key={key} className="list-disc pl-5 mb-2 space-y-1">
                  {bulletBuffer.map((item, j) => {
                    const colonIdx = item.indexOf(":");
                    if (colonIdx !== -1) {
                      const label = item.slice(0, colonIdx);
                      const rest = item.slice(colonIdx + 1);
                      return (
                        <li key={j} className="text-sm leading-relaxed" style={{ color: "var(--bfh-body)" }}>
                          <strong>{label}</strong>:{rest}
                        </li>
                      );
                    }
                    return (
                      <li key={j} className="text-sm leading-relaxed" style={{ color: "var(--bfh-body)" }}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              );
              bulletBuffer = [];
            };

            blocks.forEach((block, i) => {
              if (block.startsWith("• ")) {
                bulletBuffer.push(block.slice(2));
              } else {
                flushBullets(`bullets-${i}`);
                elements.push(
                  <p key={i} className="text-sm leading-relaxed mb-2 last:mb-0 whitespace-pre-line" style={{ color: "var(--bfh-body)" }}>
                    {block}
                  </p>
                );
              }
            });
            flushBullets("bullets-end");

            return elements;
          })()}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLanguage();
  const items = lang === "de" ? FAQ_DE : FAQ_EN;

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: "var(--bfh-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>
            {lang === "de" ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
          </h2>
          <p className="text-lg" style={{ color: "var(--bfh-blue)" }}>FAQ</p>
        </div>

        <div style={{ borderTop: "1px solid var(--bfh-border)" }}>
          {items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
