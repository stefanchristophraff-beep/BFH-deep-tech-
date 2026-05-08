"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type FormState = "idle" | "loading" | "success" | "error";

export default function FeedbackForm() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    type: "general",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Replace FORMSPREE_FORM_ID in .env.local with your actual Formspree form ID
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
      ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`
      : null;

    if (!formspreeEndpoint) {
      // Demo mode: simulate success after 1s
      await new Promise((r) => setTimeout(r, 1000));
      setFormState("success");
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section id="feedback" className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
            {t("feedback.success")}
          </h3>
          <p className="text-gray-500">{t("feedback.success.sub")}</p>
          <button
            onClick={() => {
              setFormState("idle");
              setForm({ name: "", email: "", org: "", type: "general", message: "" });
            }}
            className="mt-8 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← {t("nav.feedback")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="feedback" className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Living Database
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
              {t("feedback.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t("feedback.subtitle")}
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "📋",
                  text: t("feedback.type.missing"),
                },
                {
                  icon: "🔄",
                  text: t("feedback.type.update"),
                },
                {
                  icon: "💬",
                  text: t("feedback.type.general"),
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-600">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t("feedback.name.label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("feedback.name.placeholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t("feedback.email.label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("feedback.email.placeholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t("feedback.org.label")}
                </label>
                <input
                  type="text"
                  name="org"
                  value={form.org}
                  onChange={handleChange}
                  placeholder={t("feedback.org.placeholder")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t("feedback.type.label")}
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm bg-white"
                >
                  <option value="missing">{t("feedback.type.missing")}</option>
                  <option value="update">{t("feedback.type.update")}</option>
                  <option value="general">{t("feedback.type.general")}</option>
                  <option value="bug">{t("feedback.type.bug")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t("feedback.message.label")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("feedback.message.placeholder")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm resize-none"
                />
              </div>

              {formState === "error" && (
                <p className="text-red-600 text-sm">{t("feedback.error")}</p>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-md text-sm"
              >
                {formState === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  t("feedback.submit")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
