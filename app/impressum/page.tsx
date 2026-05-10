import Link from "next/link";

export default function Impressum() {
  return (
    <main className="min-h-screen py-24 px-4" style={{ backgroundColor: "var(--bfh-surface)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm font-600 mb-8 inline-block" style={{ color: "var(--bfh-blue)" }}>
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-700 mb-8" style={{ color: "var(--bfh-dark)" }}>Impressum</h1>

        <div className="space-y-6 text-sm" style={{ color: "var(--bfh-body)" }}>
          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Verantwortlich für diese Website</h2>
            <p>Institute for Digital Technology Management (IDTM)<br />
            Brückenstrasse 73, 3005 Bern<br />
            Schweiz</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Kontakt</h2>
            <p>E-Mail: <a href="mailto:stefan.raff@bfh.ch" style={{ color: "var(--bfh-blue)" }}>stefan.raff@bfh.ch</a></p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Projektverantwortung</h2>
            <p>Der Deep-Tech Ecosystem Navigator wurde im Rahmen einer Masterthesis an der Berner Fachhochschule entwickelt, in Zusammenarbeit mit Innosuisse – Schweizerische Agentur für Innovationsförderung.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Haftungsausschluss</h2>
            <p>Die Angaben auf dieser Website werden mit grösster Sorgfalt zusammengestellt. Die BFH übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte erfolgt auf eigene Gefahr.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Beta-Hinweis</h2>
            <p>Diese Plattform befindet sich in der Beta-Phase. Alle Daten und Informationen sind ohne Gewähr und können unvollständig oder veraltet sein.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
