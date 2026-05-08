"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 border text-sm focus:outline-none transition-colors bg-white";
const inputStyle = {
  borderColor: "var(--bfh-border)",
  color: "var(--bfh-dark)",
};

export default function FeedbackForm() {
  const { t, lang } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    type: "general",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    const formspreeEndpoint =
      `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "xnjwgqjg"}`;

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section id="feedback" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "var(--bfh-surface)", border: "2px solid var(--bfh-yellow)" }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--bfh-navy)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-700 mb-3" style={{ color: "var(--bfh-dark)" }}>
            {t("feedback.success")}
          </h3>
          <p style={{ color: "var(--bfh-muted)" }}>{t("feedback.success.sub")}</p>
          <button
            onClick={() => {
              setFormState("idle");
              setForm({ name: "", email: "", org: "", type: "general", message: "" });
            }}
            className="mt-8 text-sm font-600 underline transition-colors"
            style={{ color: "var(--bfh-blue)" }}
          >
            ← {t("nav.feedback")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="feedback" className="py-24" style={{ backgroundColor: "var(--bfh-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-600 px-3 py-1.5 mb-6"
              style={{
                backgroundColor: "var(--bfh-blue-light)",
                color: "var(--bfh-blue)",
                border: "1px solid rgba(74,126,181,0.2)",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Living Database
            </div>
            <h2 className="text-3xl sm:text-4xl font-700 mb-4" style={{ color: "var(--bfh-dark)" }}>
              {t("feedback.title")}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--bfh-body)" }}>
              {t("feedback.subtitle")}
            </p>

            <div className="space-y-3">
              {[
                { icon: "→", text: t("feedback.type.missing") },
                { icon: "→", text: t("feedback.type.update") },
                { icon: "→", text: t("feedback.type.general") },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="font-700" style={{ color: "var(--bfh-yellow)" }}>
                    {item.icon}
                  </span>
                  <span className="text-sm" style={{ color: "var(--bfh-body)" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="bg-white p-8 border-t-4"
            style={{
              borderTopColor: "var(--bfh-yellow)",
              borderLeft: "1px solid var(--bfh-border)",
              borderRight: "1px solid var(--bfh-border)",
              borderBottom: "1px solid var(--bfh-border)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-600 mb-1.5" style={{ color: "var(--bfh-dark)" }}>
                    {t("feedback.name.label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("feedback.name.placeholder")}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm font-600 mb-1.5" style={{ color: "var(--bfh-dark)" }}>
                    {t("feedback.email.label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("feedback.email.placeholder")}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-600 mb-1.5" style={{ color: "var(--bfh-dark)" }}>
                  {t("feedback.org.label")}
                </label>
                <input
                  type="text"
                  name="org"
                  value={form.org}
                  onChange={handleChange}
                  placeholder={t("feedback.org.placeholder")}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-600 mb-1.5" style={{ color: "var(--bfh-dark)" }}>
                  {t("feedback.type.label")}
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="missing">{t("feedback.type.missing")}</option>
                  <option value="update">{t("feedback.type.update")}</option>
                  <option value="general">{t("feedback.type.general")}</option>
                  <option value="bug">{t("feedback.type.bug")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-600 mb-1.5" style={{ color: "var(--bfh-dark)" }}>
                  {t("feedback.message.label")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("feedback.message.placeholder")}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {formState === "error" && (
                <p className="text-sm" style={{ color: "#dc2626" }}>
                  {t("feedback.error")}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full font-600 py-3.5 px-6 text-sm transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: "var(--bfh-yellow)",
                  color: "var(--bfh-dark)",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "var(--bfh-yellow-hover)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "var(--bfh-yellow)")
                }
              >
                {formState === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Senden…
                  </span>
                ) : (
                  t("feedback.submit")
                )}
              </button>
            <p className="text-xs mt-3" style={{ color: "var(--bfh-muted)" }}>
              {lang === "en"
                ? "Your data will only be used to process your feedback. "
                : "Ihre Daten werden ausschliesslich zur Bearbeitung Ihres Feedbacks verwendet. "}
              <a href="/datenschutz" className="underline hover:opacity-80">
                {lang === "en" ? "Privacy Policy" : "Datenschutzerklärung"}
              </a>
            </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
