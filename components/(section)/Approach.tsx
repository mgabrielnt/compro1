"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "EN" | "ID";

type Step = {
  title: string;
  description: string;
  details: string[];
  deliverables: string[];
  duration: string;
};

export default function Approach({ lang = "EN" }: { lang?: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);

  const steps = useMemo<Step[]>(
    () => [
      {
        title: t("Discover", "Discovery"),
        description: t("Value cases, risk, and constraints.", "Value case, risiko, dan batasan."),
        details: [
          t("Stakeholder interviews & workshops", "Wawancara & workshop stakeholder"),
          t("Technical debt & capability assessment", "Asesmen teknikal debt & kapabilitas"),
          t("Risk taxonomy & compliance mapping", "Taksonomi risiko & pemetaan compliance"),
          t("Business value prioritization", "Prioritisasi nilai bisnis"),
        ],
        deliverables: [
          t("Discovery report", "Laporan discovery"),
          t("Risk register", "Register risiko"),
          t("Success metrics", "Metrik kesuksesan"),
        ],
        duration: t("2-4 weeks", "2-4 minggu"),
      },
      {
        title: t("Design", "Desain"),
        description: t("Target architecture, experience, and plan.", "Arsitektur target, pengalaman, dan rencana."),
        details: [
          t("Solution architecture & design patterns", "Arsitektur solusi & pola desain"),
          t("User experience flows & prototypes", "Alur pengalaman pengguna & prototipe"),
          t("Security & compliance framework", "Framework keamanan & kepatuhan"),
          t("Delivery roadmap with phases", "Roadmap delivery dengan fase"),
        ],
        deliverables: [
          t("Architecture blueprints", "Blueprint arsitektur"),
          t("UX prototypes", "Prototipe UX"),
          t("Delivery plan", "Rencana delivery"),
        ],
        duration: t("3-6 weeks", "3-6 minggu"),
      },
      {
        title: t("Build", "Bangun"),
        description: t("Agile delivery with DevSecOps.", "Delivery agile dengan DevSecOps."),
        details: [
          t("Sprint-based development cycles", "Siklus pengembangan berbasis sprint"),
          t("Continuous integration & deployment", "Integrasi & deployment berkelanjutan"),
          t("Security testing & code reviews", "Pengujian keamanan & code review"),
          t("Regular demos & feedback loops", "Demo rutin & feedback loop"),
        ],
        deliverables: [
          t("Working software increments", "Increment software yang berfungsi"),
          t("Test automation suite", "Test automation suite"),
          t("Technical documentation", "Dokumentasi teknis"),
        ],
        duration: t("8-16 weeks", "8-16 minggu"),
      },
      {
        title: t("Run & Scale", "Operasi & Scale"),
        description: t("SRE, FinOps, and capability uplift.", "SRE, FinOps, dan peningkatan kapabilitas."),
        details: [
          t("Production monitoring & observability", "Monitoring produksi & observabilitas"),
          t("Incident management & on-call support", "Manajemen insiden & dukungan on-call"),
          t("Cost optimization & FinOps practices", "Optimasi biaya & praktik FinOps"),
          t("Team training & knowledge transfer", "Pelatihan tim & transfer pengetahuan"),
        ],
        deliverables: [
          t("SRE playbooks", "Playbook SRE"),
          t("Cost dashboards", "Dashboard biaya"),
          t("Training materials", "Materi pelatihan"),
        ],
        duration: t("Ongoing", "Berkelanjutan"),
      },
    ],
    [lang, t]
  );

  const [active, setActive] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const total = steps.length;
  const progress = ((active + 1) / total) * 100;

  useEffect(() => {
    if (active < 0) setActive(0);
    if (active > total - 1) setActive(total - 1);
  }, [active, total]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((s) => Math.min(s + 1, total - 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowDetail(true);
    }
    if (e.key === "Escape" && showDetail) {
      e.preventDefault();
      setShowDetail(false);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((s) => (s + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="bg-white-500">
      <section id="approach" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className=" mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {t("Our approach", "Pendekatan kami")}
            </h2>
            <p className="mt-2 text-gray-600">
              {t(
                "A proven methodology that balances speed with quality",
                "Metodologi terbukti yang menyeimbangkan kecepatan dengan kualitas"
              )}
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Progress Bar */}
            <div className="px-8 pt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-900">
                  {t("Step", "Langkah")} {active + 1} {t("of", "dari")} {total}
                </div>
                <div className="text-sm text-gray-500">{steps[active].duration}</div>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gray-900 to-gray-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Steps Grid */}
            <div
              role="list"
              aria-label={t("Our approach steps", "Langkah pendekatan kami")}
              tabIndex={0}
              onKeyDown={onKey}
              className="p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 outline-none"
            >
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={step.title}
                    role="listitem"
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i);
                      setShowDetail(true);
                    }}
                    aria-current={isActive ? "step" : undefined}
                    className={`group relative text-left rounded-xl border p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                      isActive
                        ? "border-gray-900 bg-gradient-to-br from-gray-50 to-white shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-4 transition-all duration-300 ${
                        isActive 
                          ? "bg-gray-900 text-white shadow-sm" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </div>

                    {/* Title */}
                    <div
                      className={`font-bold text-lg mb-2 transition-colors ${
                        isActive ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
                      }`}
                    >
                      {step.title}
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        isActive ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-b-xl" />
                    )}

                    {/* Hover Arrow */}
                    <div
                      className={`absolute top-6 right-6 transition-all duration-300 ${
                        isActive 
                          ? "opacity-100 translate-x-0" 
                          : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="px-8 pb-8 flex items-center justify-between">
              <button
                onClick={() => setActive((s) => Math.max(s - 1, 0))}
                disabled={active === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                {t("Previous", "Sebelumnya")}
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`transition-all ${
                      i === active
                        ? "w-8 h-2 bg-gray-900 rounded-full"
                        : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActive((s) => Math.min(s + 1, total - 1))}
                disabled={active === total - 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Next", "Selanjutnya")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>


        </div>
      </section>

      {/* Detail Modal */}
      {showDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 mb-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 text-white text-xs">
                      {active + 1}
                    </span>
                    {t("Step", "Langkah")} {active + 1} {t("of", "dari")} {total}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{steps[active].title}</h3>
                  <p className="text-lg text-gray-700">{steps[active].description}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {steps[active].duration}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Key Activities */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">
                  {t("Key Activities", "Aktivitas Utama")}
                </h4>
                <ul className="space-y-3">
                  {steps[active].details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 items-start group">
                      <svg
                        className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-800 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">
                  {t("Deliverables", "Deliverable")}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {steps[active].deliverables.map((deliverable, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const newActive = Math.max(active - 1, 0);
                    setActive(newActive);
                    if (newActive === active) setShowDetail(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  {active > 0 ? steps[active - 1].title : t("Close", "Tutup")}
                </button>

                <a
                  href="#contact"
                  onClick={() => setShowDetail(false)}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  {t("Let's talk", "Mari bicara")}
                </a>

                <button
                  onClick={() => {
                    const newActive = Math.min(active + 1, total - 1);
                    setActive(newActive);
                    if (newActive === active) setShowDetail(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {active < total - 1 ? steps[active + 1].title : t("Close", "Tutup")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}