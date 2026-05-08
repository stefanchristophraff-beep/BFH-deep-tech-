"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="2" className="opacity-40" />
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <circle cx="12" cy="12" r="1" strokeWidth="2" fill="white" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">Deep Tech Radar</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">{t("footer.tagline")}</p>
            <p className="text-xs text-gray-600 mt-2">{t("footer.beta")}</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.legal")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.contact")}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} Berner Fachhochschule — Deep Tech Radar.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Beta v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
