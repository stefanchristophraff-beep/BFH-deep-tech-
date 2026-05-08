export type ProgramStatus = "open" | "ongoing" | "closed";
export type ProgramCategory =
  | "funding"
  | "accelerator"
  | "network"
  | "research"
  | "cantonal";

export interface Program {
  id: string;
  name: string;
  provider: string;
  description: {
    de: string;
    en: string;
  };
  category: ProgramCategory;
  tags: string[];
  status: ProgramStatus;
  funding?: string;
  deadline?: string;
  url: string;
  stage: string[];
  canton?: string;
}

// Demo data — replace with live Airtable fetch via AIRTABLE_API_KEY + AIRTABLE_BASE_ID
export const DEMO_PROGRAMS: Program[] = [
  {
    id: "1",
    name: "Innosuisse Startup Coaching",
    provider: "Innosuisse",
    description: {
      de: "Coaching-Programm für innovative Schweizer Startups. Unterstützt bei Unternehmensgründung, Geschäftsmodell und Markteintritt.",
      en: "Coaching program for innovative Swiss startups. Supports company formation, business model development and market entry.",
    },
    category: "funding",
    tags: ["Deep Tech", "Coaching", "Business Development"],
    status: "open",
    funding: "Bis CHF 25'000",
    url: "https://www.innosuisse.ch",
    stage: ["Idea", "Early Stage"],
  },
  {
    id: "2",
    name: "Venture Kick",
    provider: "Venture Kick Foundation",
    description: {
      de: "Schweizer Förderprogramm für Startups aus Schweizer Hochschulen. Bis zu CHF 130'000 Startkapital in drei Phasen.",
      en: "Swiss funding program for startups from Swiss universities. Up to CHF 130,000 seed capital in three phases.",
    },
    category: "funding",
    tags: ["University Spin-off", "Seed Funding", "Pitching"],
    status: "open",
    funding: "Bis CHF 130'000",
    url: "https://www.venturekick.ch",
    stage: ["Idea", "Early Stage"],
  },
  {
    id: "3",
    name: "EPFL Innovation Park",
    provider: "EPFL",
    description: {
      de: "Technologiepark im Herzen der EPFL, der Startups Zugang zu Infrastruktur, Netzwerken und Expertise bietet.",
      en: "Technology park at the heart of EPFL, offering startups access to infrastructure, networks and expertise.",
    },
    category: "accelerator",
    tags: ["Deep Tech", "Hardware", "Biotech", "Infrastructure"],
    status: "ongoing",
    url: "https://innovationpark.epfl.ch",
    stage: ["Early Stage", "Growth"],
    canton: "VD",
  },
  {
    id: "4",
    name: "ETH Zurich Pioneer Fellowship",
    provider: "ETH Zürich",
    description: {
      de: "Fellowships für ETH-Absolventen und Forschende, die ein technologiebasiertes Unternehmen gründen wollen.",
      en: "Fellowships for ETH graduates and researchers who want to found a technology-based company.",
    },
    category: "funding",
    tags: ["Deep Tech", "University Spin-off", "Fellowship"],
    status: "open",
    funding: "CHF 150'000",
    url: "https://ethz.ch/pioneer-fellowship",
    stage: ["Idea", "Early Stage"],
    canton: "ZH",
  },
  {
    id: "5",
    name: "Switzerland Innovation Park Network",
    provider: "Switzerland Innovation",
    description: {
      de: "Nationales Netzwerk von Innovationsparks, das Startups Zugang zu Industrie, Forschung und internationalem Kapital bietet.",
      en: "National network of innovation parks providing startups access to industry, research and international capital.",
    },
    category: "network",
    tags: ["Deep Tech", "Industry Partnerships", "R&D"],
    status: "ongoing",
    url: "https://www.switzerland-innovation.com",
    stage: ["Early Stage", "Growth", "Scale-up"],
  },
  {
    id: "6",
    name: "BaselArea Startup Grant",
    provider: "BaselArea",
    description: {
      de: "Unterstützungsprogramm für Startups im Kanton Basel-Stadt und Basel-Landschaft mit Fokus auf Life Sciences und Chemie.",
      en: "Support program for startups in Basel-Stadt and Basel-Landschaft cantons with a focus on life sciences and chemistry.",
    },
    category: "cantonal",
    tags: ["Life Sciences", "Chemistry", "Biotech"],
    status: "open",
    funding: "Bis CHF 50'000",
    url: "https://www.baselarea.swiss",
    stage: ["Idea", "Early Stage"],
    canton: "BS/BL",
  },
  {
    id: "7",
    name: "W.A. de Vigier Award",
    provider: "W.A. de Vigier Stiftung",
    description: {
      de: "Einer der bedeutendsten Startup-Preise der Schweiz. Jährlich werden 5 Startups mit je CHF 100'000 ausgezeichnet.",
      en: "One of the most important startup awards in Switzerland. Every year 5 startups are awarded CHF 100,000 each.",
    },
    category: "funding",
    tags: ["Award", "All Sectors", "Visibility"],
    status: "closed",
    funding: "CHF 100'000",
    deadline: "31. März",
    url: "https://www.devigier.ch",
    stage: ["Early Stage", "Growth"],
  },
  {
    id: "8",
    name: "CTI Startup Label",
    provider: "Innosuisse (ehem. CTI)",
    description: {
      de: "Qualitätslabel für innovative Technologie-Startups, das Zugang zu einem exklusiven Netzwerk und Investoren ermöglicht.",
      en: "Quality label for innovative technology startups that enables access to an exclusive network and investors.",
    },
    category: "network",
    tags: ["Label", "Investor Network", "Tech"],
    status: "ongoing",
    url: "https://www.innosuisse.ch/startup-label",
    stage: ["Early Stage", "Growth"],
  },
  {
    id: "9",
    name: "Gebert Rüf Stiftung – SPARK",
    provider: "Gebert Rüf Stiftung",
    description: {
      de: "Fördert den Transfer von Forschungsergebnissen in wirtschaftlich verwertbare Lösungen. Bis CHF 100'000 für Proof-of-Concept.",
      en: "Supports the transfer of research results into economically viable solutions. Up to CHF 100,000 for proof of concept.",
    },
    category: "research",
    tags: ["Research Transfer", "Proof of Concept", "University"],
    status: "open",
    funding: "Bis CHF 100'000",
    url: "https://www.grstiftung.ch/spark",
    stage: ["Idea", "Early Stage"],
  },
  {
    id: "10",
    name: "Zurich Startup Week",
    provider: "Startupticker",
    description: {
      de: "Jährliches Networking-Event für das Zürcher Startup-Ökosystem mit Pitching-Wettbewerben, Workshops und Investorentreffen.",
      en: "Annual networking event for the Zurich startup ecosystem with pitching competitions, workshops and investor meetings.",
    },
    category: "network",
    tags: ["Event", "Networking", "Pitching", "Zürich"],
    status: "ongoing",
    url: "https://www.zurichstartupweek.ch",
    stage: ["Idea", "Early Stage", "Growth"],
    canton: "ZH",
  },
  {
    id: "11",
    name: "Fondation pour l'Innovation Technologique (FIT)",
    provider: "FIT",
    description: {
      de: "Unterstützt Technologie-Startups in der Westschweiz mit Finanzierung und Beratung in der Frühphase.",
      en: "Supports technology startups in Western Switzerland with early-stage financing and consulting.",
    },
    category: "cantonal",
    tags: ["Romandie", "Early Stage", "Tech"],
    status: "open",
    funding: "Bis CHF 200'000",
    url: "https://www.fit.ch",
    stage: ["Idea", "Early Stage"],
    canton: "GE/VD",
  },
  {
    id: "12",
    name: "Deep Tech Talents Program – SATW",
    provider: "Schweizerische Akademie der Technischen Wissenschaften",
    description: {
      de: "Fördert den Nachwuchs in den technischen Wissenschaften und vernetzt Deep-Tech-Talente mit Startups und Unternehmen.",
      en: "Promotes young talent in technical sciences and connects deep tech talents with startups and companies.",
    },
    category: "network",
    tags: ["Deep Tech", "Talent", "STEM", "Mentoring"],
    status: "ongoing",
    url: "https://www.satw.ch",
    stage: ["Idea", "Early Stage"],
  },
];
