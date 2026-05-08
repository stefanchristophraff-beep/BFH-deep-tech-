"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "de" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Nav
    "nav.radar": "Radar",
    "nav.about": "Über uns",
    "nav.feedback": "Feedback",
    "nav.cta": "Zum Radar",

    // Hero
    "hero.badge": "Beta",
    "hero.title": "Deep-Tech Startup Radar Schweiz",
    "hero.subtitle":
      "Alle Förderprogramme, Acceleratoren und Support-Angebote für Deep Tech Startups in der Schweiz – durchsuchbar, aktuell und kuratiert.",
    "hero.cta.primary": "Radar erkunden",
    "hero.cta.secondary": "Feedback geben",
    "hero.stat1.value": "160+",
    "hero.stat1.label": "kartierte Support-Angebote in der Schweiz",
    "hero.stat2.value": "13",
    "hero.stat2.label": "Support-Dimensionen – von Coaching bis Funding",
    "hero.stat3.value": "Living",
    "hero.stat3.label": "Database – wird laufend weiterentwickelt",

    // About
    "about.title": "Was ist der Startup Radar?",
    "about.subtitle":
      "Eine lebendige Datenbank, die kontinuierlich wächst – mit eurer Hilfe.",
    "about.card1.title": "Alle Programme auf einen Blick",
    "about.card1.desc":
      "Von Bundesförderung bis Kantonsprogrammen, von Acceleratoren bis Netzwerken – alles an einem Ort.",
    "about.card2.title": "Smarte Suche",
    "about.card2.desc":
      "Filtere nach Technologiebereich, Unternehmensphase, Fördertyp und mehr, um die relevantesten Angebote in der Schweiz für dein Startup zu finden.",
    "about.card3.title": "Living Database",
    "about.card3.desc":
      "Der Radar ist eine Living Database und lebt vom Community-Input. Dein Feedback hilft uns, die Datenbank aktuell und vollständig zu halten. Falls du noch Angebote kennst, gib uns Feedback!",
    "about.card4.title": "Beta-Phase",
    "about.card4.desc":
      "Wir bauen den Radar gemeinsam mit euch. Als Early-Adopter hilfst du uns, das Tool zu verbessern.",

    // Radar
    "radar.title": "Radar erkunden",
    "radar.subtitle":
      "Durchsuche alle Deep Tech Support Programme für Schweizer Startups",
    "radar.search.placeholder": "Programme oder Schlagworte suchen",
    "radar.filter.all": "Alle Kategorien",
    "radar.filter.funding": "Förderung",
    "radar.filter.accelerator": "Accelerator",
    "radar.filter.network": "Netzwerk",
    "radar.filter.research": "Forschung",
    "radar.filter.cantonal": "Kantonal",
    "radar.noresults": "Keine Programme gefunden. Bitte passe deine Suche an.",
    "radar.tag.open": "Offen",
    "radar.tag.ongoing": "Laufend",
    "radar.tag.closed": "Geschlossen",
    "radar.cta": "Direktlink zum Programm",
    "radar.airtable.hint":
      "Echtdaten werden nach Airtable-Integration geladen.",

    // Feedback
    "feedback.title": "Feedback geben",
    "feedback.subtitle":
      "Helfe uns, den Radar zu verbessern. Fehlt ein Programm? Sind Informationen veraltet? Wir freuen uns über jeden Hinweis.",
    "feedback.name.label": "Name",
    "feedback.name.placeholder": "Dein Name",
    "feedback.email.label": "E-Mail",
    "feedback.email.placeholder": "deine@email.ch",
    "feedback.org.label": "Organisation / Startup",
    "feedback.org.placeholder": "Optional",
    "feedback.type.label": "Art des Feedbacks",
    "feedback.type.missing": "Fehlendes Programm",
    "feedback.type.update": "Veraltete Information",
    "feedback.type.general": "Allgemeines Feedback",
    "feedback.type.bug": "Fehler melden",
    "feedback.message.label": "Nachricht",
    "feedback.message.placeholder":
      "Beschreibe dein Feedback so detailliert wie möglich…",
    "feedback.submit": "Feedback senden",
    "feedback.success": "Vielen Dank für dein Feedback!",
    "feedback.success.sub":
      "Wir melden uns bei dir, sobald wir dein Feedback verarbeitet haben.",
    "feedback.error": "Fehler beim Senden. Bitte versuche es erneut.",

    // Footer
    "footer.tagline": "Die lebendige Karte der Schweizer Deep Tech Förderung.",
    "footer.legal": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.contact": "Kontakt",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.beta":
      "Dieser Radar befindet sich in der Beta-Phase. Daten ohne Gewähr.",
  },
  en: {
    // Nav
    "nav.radar": "Radar",
    "nav.about": "About",
    "nav.feedback": "Feedback",
    "nav.cta": "Open Radar",

    // Hero
    "hero.badge": "Beta",
    "hero.title": "Deep-Tech Startup Radar Switzerland",
    "hero.subtitle":
      "All funding programs, accelerators and support offers for deep tech startups in Switzerland – searchable, current and curated.",
    "hero.cta.primary": "Explore Radar",
    "hero.cta.secondary": "Give Feedback",
    "hero.stat1.value": "160+",
    "hero.stat1.label": "mapped support offers in Switzerland",
    "hero.stat2.value": "13",
    "hero.stat2.label": "support dimensions – from coaching to funding",
    "hero.stat3.value": "Living",
    "hero.stat3.label": "Database – continuously updated",

    // About
    "about.title": "What is the Startup Radar?",
    "about.subtitle":
      "A living database that grows continuously – with your help.",
    "about.card1.title": "All programs at a glance",
    "about.card1.desc":
      "From federal funding to cantonal programs, from accelerators to networks – everything in one place.",
    "about.card2.title": "Smart search",
    "about.card2.desc":
      "Filter by technology area, company stage, funding type and more to find the most relevant offers.",
    "about.card3.title": "Living Database",
    "about.card3.desc":
      "The radar thrives on community input. Your feedback helps us keep the database current and complete.",
    "about.card4.title": "Beta Phase",
    "about.card4.desc":
      "We're building the radar together with you. As an early adopter, you help us improve the tool.",

    // Radar
    "radar.title": "Explore Radar",
    "radar.subtitle":
      "Browse all Deep Tech support programs for Swiss startups",
    "radar.search.placeholder": "Search programs or keywords",
    "radar.filter.all": "All Categories",
    "radar.filter.funding": "Funding",
    "radar.filter.accelerator": "Accelerator",
    "radar.filter.network": "Network",
    "radar.filter.research": "Research",
    "radar.filter.cantonal": "Cantonal",
    "radar.noresults": "No programs found. Please adjust your search.",
    "radar.tag.open": "Open",
    "radar.tag.ongoing": "Ongoing",
    "radar.tag.closed": "Closed",
    "radar.cta": "Direct link to program",
    "radar.airtable.hint": "Live data will load after Airtable integration.",

    // Feedback
    "feedback.title": "Give Feedback",
    "feedback.subtitle":
      "Help us improve the radar. Missing a program? Is information outdated? We appreciate every tip.",
    "feedback.name.label": "Name",
    "feedback.name.placeholder": "Your name",
    "feedback.email.label": "Email",
    "feedback.email.placeholder": "your@email.com",
    "feedback.org.label": "Organisation / Startup",
    "feedback.org.placeholder": "Optional",
    "feedback.type.label": "Type of feedback",
    "feedback.type.missing": "Missing program",
    "feedback.type.update": "Outdated information",
    "feedback.type.general": "General feedback",
    "feedback.type.bug": "Report a bug",
    "feedback.message.label": "Message",
    "feedback.message.placeholder":
      "Describe your feedback in as much detail as possible…",
    "feedback.submit": "Send Feedback",
    "feedback.success": "Thank you for your feedback!",
    "feedback.success.sub":
      "We will get back to you once we have processed your feedback.",
    "feedback.error": "Error sending. Please try again.",

    // Footer
    "footer.tagline": "The living map of Swiss Deep Tech funding.",
    "footer.legal": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.beta": "This radar is in beta. Data without guarantee.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("de");

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
