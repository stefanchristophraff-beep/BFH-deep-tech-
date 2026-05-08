"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeWidth="2"
                  className="opacity-40"
                />
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <circle cx="12" cy="12" r="1" strokeWidth="2" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              Deep Tech Radar{" "}
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full ml-1">
                Beta
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <button
              onClick={() => scrollTo("radar")}
              className="hover:text-blue-600 transition-colors"
            >
              {t("nav.radar")}
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-blue-600 transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollTo("feedback")}
              className="hover:text-blue-600 transition-colors"
            >
              {t("nav.feedback")}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang("de")}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === "de"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => scrollTo("radar")}
              className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {t("nav.cta")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
