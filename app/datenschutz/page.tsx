import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="min-h-screen py-24 px-4" style={{ backgroundColor: "var(--bfh-surface)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm font-600 mb-8 inline-block" style={{ color: "var(--bfh-blue)" }}>
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>Datenschutzerklärung</h1>
        <p className="text-xs mb-8" style={{ color: "var(--bfh-muted)" }}>Gemäss Schweizer Datenschutzgesetz (nDSG, in Kraft seit 1. September 2023)</p>

        <div className="space-y-6 text-sm" style={{ color: "var(--bfh-body)" }}>
          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>1. Verantwortliche Stelle</h2>
            <p>Berner Fachhochschule (BFH)<br />
            Institute for Digital Technology Management (IDTM)<br />
            Schwarztorstrasse 48, 3007 Bern<br />
            E-Mail: <a href="mailto:stefan.raff@bfh.ch" style={{ color: "var(--bfh-blue)" }}>stefan.raff@bfh.ch</a></p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>2. Erhobene Daten und Zweck</h2>
            <p className="mb-2">Im Rahmen des Feedback-Formulars erheben wir folgende Angaben:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li><strong>Name</strong> – zur Identifikation und Rückmeldung</li>
              <li><strong>E-Mail-Adresse</strong> – für eine allfällige Rückmeldung</li>
              <li><strong>Organisation / Startup</strong> – optional, zur besseren Einordnung</li>
              <li><strong>Art des Feedbacks und Nachricht</strong> – zur Verbesserung des Radars</li>
            </ul>
            <p className="mt-2">Diese Daten werden ausschliesslich zur Bearbeitung Ihres Feedbacks und zur Weiterentwicklung des Deep-Tech Startup Radars verwendet.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>3. Drittanbieter – Airtable</h2>
            <p>Die über das Formular übermittelten Daten werden in <strong>Airtable</strong> (Airtable Inc., San Francisco, USA) gespeichert. Airtable verarbeitet Daten gemäss seiner eigenen Datenschutzrichtlinie: <a href="https://www.airtable.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bfh-blue)" }}>airtable.com/privacy</a>. Durch das Absenden des Formulars erklären Sie sich mit dieser Verarbeitung einverstanden.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>4. Speicherdauer</h2>
            <p>Ihre Daten werden so lange gespeichert, wie sie für die Weiterentwicklung des Radars relevant sind, maximal jedoch 24 Monate nach Eingang.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>5. Ihre Rechte</h2>
            <p className="mb-2">Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung Ihrer Daten</li>
              <li>Einschränkung der Bearbeitung</li>
            </ul>
            <p className="mt-2">Richten Sie entsprechende Anfragen an: <a href="mailto:stefan.raff@bfh.ch" style={{ color: "var(--bfh-blue)" }}>stefan.raff@bfh.ch</a></p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>6. Hosting und technische Infrastruktur</h2>
            <p>Diese Website wird über <strong>Vercel Inc.</strong> (San Francisco, USA) gehostet. Die Übertragung erfolgt verschlüsselt via HTTPS. Vercel kann technische Zugriffsdaten (IP-Adresse, Browser, Zeitstempel) in Logs erfassen. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bfh-blue)" }}>vercel.com/legal/privacy-policy</a>.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>7. Keine Cookies / kein Tracking</h2>
            <p>Diese Website setzt keine Tracking-Cookies ein und verwendet keine Analyse-Tools wie Google Analytics.</p>
          </section>

          <section>
            <h2 className="font-700 mb-2" style={{ color: "var(--bfh-dark)" }}>8. Änderungen dieser Erklärung</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
