"use client";

import { useMemo, useState } from "react";

type Lang = "EN" | "ID";

type CaseItem = {
  cap: string;
  title: string;
  body: string;
  image: string;
  details: string[];
  metrics?: { label: string; value: string }[];
  screenshots?: string[];
  technologies?: string[];
};

export default function CaseStudies({ lang = "EN" }: { lang?: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);
  const [detail, setDetail] = useState<null | CaseItem>(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const cards: CaseItem[] = [
    {
      cap: t("Financial Services", "Jasa Keuangan"),
      title: t("Cloud‑native onboarding reduced time‑to‑KYC by 42%", "Onboarding cloud‑native mengurangi waktu KYC 42%"),
      body: t("Secure platform deployed across 12 regions.", "Platform aman diterapkan di 12 wilayah."),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
      ],
      details: [
        t("KYC micro‑journeys with risk‑based flows", "Micro‑journey KYC dengan alur berbasis risiko"),
        t("Zero‑trust APIs + consent ledger", "API zero‑trust + consent ledger"),
        t("Observability & SRE SLIs", "Observability & SRE SLI"),
        t("Real-time fraud detection integration", "Integrasi deteksi fraud real-time"),
        t("Multi-region data residency compliance", "Kepatuhan residensi data multi-wilayah")
      ],
      metrics: [
        { label: t("TtKYC", "Waktu ke KYC"), value: "-42%" },
        { label: "Regions", value: "12" },
        { label: t("Uptime", "Uptime"), value: "99.9%" }
      ],
      technologies: ["Kubernetes", "API Gateway", "PostgreSQL", "Redis", "Kafka"]
    },
    {
      cap: t("Telecommunications", "Telekomunikasi"),
      title: t("AIOps cut MTTR by 37% across 5 data centers", "AIOps memangkas MTTR 37% di 5 data center"),
      body: t("Observability stack unified; predictive alerts.", "Observability disatukan; peringatan prediktif."),
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
      ],
      details: [
        t("Log/metrics/traces federated", "Log/metric/trace terfederasi"),
        t("Noise reduction via ML", "Reduksi noise via ML"),
        t("Runbook automation", "Otomasi runbook"),
        t("Anomaly detection with 95% accuracy", "Deteksi anomali dengan akurasi 95%"),
        t("Automated incident triage", "Triase insiden otomatis")
      ],
      metrics: [
        { label: "MTTR", value: "-37%" },
        { label: "DC", value: "5" },
        { label: t("Alerts", "Peringatan"), value: "-65%" }
      ],
      technologies: ["Prometheus", "Grafana", "ELK Stack", "TensorFlow", "Python"]
    },
    {
      cap: t("Public Sector", "Sektor Publik"),
      title: t("National ID services handle 50M+ monthly requests", "Layanan ID nasional menangani 50J+ request/bulan"),
      body: t("Resilient APIs with zero‑trust architecture.", "API tangguh dengan arsitektur zero‑trust."),
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop"
      ],
      details: [
        t("Rate‑limit & throttling policy", "Kebijakan rate‑limit & throttling"),
        t("Hardware‑backed keys", "Kunci ber‑hardware"),
        t("Geo‑redundant failover", "Failover geo‑redundan"),
        t("GDPR & local compliance framework", "Framework GDPR & kepatuhan lokal"),
        t("Biometric verification integration", "Integrasi verifikasi biometrik")
      ],
      metrics: [
        { label: t("Monthly req", "Request bulanan"), value: "50M+" },
        { label: t("Response", "Respons"), value: "<100ms" }
      ],
      technologies: ["Kong Gateway", "HSM", "MongoDB", "Node.js", "Docker Swarm"]
    },
  ];

  return (
    <div className="min-h-screen bg-white-500">
      <section id="cases" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {t("Selected case ", "Studi kasus ")}
              </h2>
              <p className="mt-2 text-gray-600">{t("Real-world impact across industries", "Dampak nyata di berbagai industri")}</p>
            </div>
            <a href="#contact" className="text-sm underline underline-offset-4 hover:text-gray-600 transition-colors">
              {t("Request full portfolio", "Minta portfolio lengkap")}
            </a>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <article
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => { setDetail(c); setCurrentScreenshot(0); }}
                onKeyDown={(e) => { if (e.key === "Enter") { setDetail(c); setCurrentScreenshot(0); } }}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 relative"
                aria-label={t("Open case study", "Buka studi kasus")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="aspect-[16/9] relative overflow-hidden bg-gray-900">
                    <img 
                      src={c.image} 
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {c.metrics && (
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        {c.metrics.slice(0, 2).map((m, idx) => (
                          <div key={idx} className="backdrop-blur-md bg-white/95 rounded-lg px-3 py-1.5 shadow-lg border border-white/20">
                            <div className="text-xs font-bold text-gray-900">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold group-hover:text-black transition-colors">
                      {c.cap}
                    </div>
                    <h3 className="mt-2 text-lg font-bold group-hover:text-gray-900 transition-colors leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {c.body}
                    </p>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                      {t("View details", "Lihat detail")} 
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {detail && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" 
          onClick={() => setDetail(null)}
        >
          <div 
            role="dialog" 
            aria-modal="true" 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-300" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery */}
            {detail.screenshots && detail.screenshots.length > 0 && (
              <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden">
                <img 
                  src={detail.screenshots[currentScreenshot]} 
                  alt={`Screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation */}
                {detail.screenshots.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setCurrentScreenshot((currentScreenshot - 1 + detail.screenshots!.length) % detail.screenshots!.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Previous"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setCurrentScreenshot((currentScreenshot + 1) % detail.screenshots!.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Next"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {detail.screenshots.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentScreenshot(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentScreenshot ? 'bg-white w-8' : 'bg-white/60 hover:bg-white/80'
                          }`}
                          aria-label={`Go to screenshot ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{detail.cap}</div>
                  <h3 className="text-2xl font-bold mt-2 leading-tight">{detail.title}</h3>
                  <p className="mt-3 text-gray-600">{detail.body}</p>
                </div>
                <button 
                  onClick={() => setDetail(null)} 
                  className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors" 
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M6 18L18 6"/>
                  </svg>
                </button>
              </div>

              {/* Metrics */}
              {detail.metrics && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {detail.metrics.map((m, idx) => (
                    <div 
                      key={m.label + m.value} 
                      className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 text-center hover:shadow-md hover:border-gray-300 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {m.value}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 font-medium uppercase tracking-wide">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
                  {t("Key Features", "Fitur Utama")}
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {detail.details.map((d, idx) => (
                    <li 
                      key={d} 
                      className="flex gap-3 hover:translate-x-1 transition-transform duration-200"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <svg className="mt-0.5 h-5 w-5 text-gray-900 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              {detail.technologies && (
                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
                    {t("Technologies Used", "Teknologi yang Digunakan")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-200">
                <a 
                  href="#contact" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full bg-black text-white px-6 py-2.5 text-sm font-semibold hover:bg-gray-900 transition-colors shadow-sm hover:shadow-md"
                >
                  {t("Discuss similar project", "Diskusikan proyek serupa")}
                </a>
                <a 
                  href="#approach" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {t("See our approach", "Lihat pendekatan kami")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}