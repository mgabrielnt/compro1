"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/types";

type Service = { title: string; desc: string; pts: string[] };

export default function Services({ lang }: { lang: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);
  const [detail, setDetail] = useState<null | Service>(null);

  const cards: Service[] = [
    {
      title: t("Strategy & Transformation","Strategi & Transformasi"),
      desc: t("From value cases and OKRs to operating model, governance, and enterprise architecture.","Dari value case & OKR ke model operasional, tata kelola, dan arsitektur enterprise."),
      pts: [t("Digital strategy & value cases","Strategi digital & value case"), t("Operating model & governance","Model operasional & tata kelola"), t("Enterprise architecture","Arsitektur enterprise")]
    },
    {
      title: t("Cloud & Platform","Cloud & Platform"),
      desc: t("Design/run modern cloud platforms, platform engineering (IDP), SRE, and FinOps.","Merancang/menjalankan platform cloud modern, platform engineering (IDP), SRE, dan FinOps."),
      pts: [t("Cloud migration & modernization","Migrasi & modernisasi cloud"), t("Platform engineering / IDP","Platform engineering / IDP"), t("DevSecOps & SRE","DevSecOps & SRE")]
    },
    {
      title: t("Data & AI","Data & AI"),
      desc: t("Enterprise data platforms, analytics/ML/GenAI with proper MLOps and governance.","Platform data enterprise, analytics/ML/GenAI dengan MLOps dan tata kelola yang tepat."),
      pts: [t("Data platforms / MDS","Platform data / MDS"), t("Analytics, ML & GenAI","Analitik, ML & GenAI"), t("MLOps & governance","MLOps & tata kelola")]
    },
    {
      title: t("Enterprise Engineering","Rekayasa Enterprise"),
      desc: t("Build/modernize services & APIs, integrate ERP/CRM, and retire legacy safely.","Bangun/modernisasi layanan & API, integrasi ERP/CRM, dan pensiunkan legacy secara aman."),
      pts: [t("Microservices & APIs","Microservices & API"), t("ERP/CRM integration","Integrasi ERP/CRM"), t("Legacy modernization","Modernisasi legacy")]
    },
    {
      title: t("Cybersecurity","Keamanan Siber"),
      desc: t("Zero‑trust architecture, threat modeling/IR, and compliance automation.","Arsitektur zero‑trust, threat modeling/IR, dan otomasi kepatuhan."),
      pts: [t("Zero‑trust architecture","Arsitektur zero‑trust"), t("Threat modeling & IR","Threat modeling & IR"), t("Compliance (ISO, SOC, PCI)","Kepatuhan (ISO, SOC, PCI)")]
    },
    {
      title: t("Experience & Design","Pengalaman & Desain"),
      desc: t("Research to delivery of design systems and accessible interfaces.","Riset hingga delivery design system dan antarmuka yang aksesibel."),
      pts: [t("Discovery & UX research","Discovery & riset UX"), t("Design systems & UI","Design system & UI"), t("Accessibility & usability","Aksesibilitas & kegunaan")]
    },
    {
      title: t("Operations & Automation","Operasi & Otomasi"),
      desc: t("ITSM/ESM, ServiceNow, AIOps/observability, RPA & process mining.","ITSM/ESM, ServiceNow, AIOps/observability, RPA & process mining."),
      pts: [t("ITSM/ESM & ServiceNow","ITSM/ESM & ServiceNow"), t("AIOps & observability","AIOps & observability"), t("Process mining & RPA","Process mining & RPA")]
    },
    {
      title: t("Risk & Compliance","Risiko & Kepatuhan"),
      desc: t("GRC platforms, privacy/ethics, and resilience planning (BCP/DR).","Platform GRC, privasi/etika, dan perencanaan ketahanan (BCP/DR)."),
      pts: [t("GRC platforms","Platform GRC"), t("Data privacy & ethics","Privasi data & etika"), t("BCP/DR & resiliency","BCP/DR & resiliensi")]
    },
    {
      title: t("Industry Solutions","Solusi Industri"),
      desc: t("Prebuilt blueprints for FSI, Telco, and Public sector to accelerate outcomes.","Blueprint siap pakai untuk FSI, Telco, dan sektor Publik untuk mempercepat hasil."),
      pts: [t("FSI: onboarding, KYC, risk","FSI: onboarding, KYC, risiko"), t("Telco: BSS/OSS, 5G","Telco: BSS/OSS, 5G"), t("Public: ID stack & e‑Gov","Publik: ID stack & e‑Gov")]
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("What we do","Apa yang kami lakukan")}</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">{t("Strategy, build, and run — measurable business outcomes.","Strategy, build, dan run — hasil bisnis yang terukur.")}</p>
          </div>
          <a href="#governance" className="hidden sm:inline-flex text-sm underline underline-offset-4">{t("See delivery governance","Lihat tata kelola delivery")}</a>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              role="button"
              tabIndex={0}
              onClick={() => setDetail(c)}
              onKeyDown={(e) => { if ((e as any).key === "Enter") setDetail(c); }}
              className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
              aria-label={t("Open details","Buka detail")}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 group-hover:bg-gray-50">→</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {c.pts.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="sr-only">{c.desc}</div>
            </article>
          ))}
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDetail(null)}>
          <div role="dialog" aria-modal="true" className="mx-auto mt-24 w-[min(680px,94vw)] rounded-2xl border border-gray-200 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{detail.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{detail.desc}</p>
                </div>
                <button onClick={() => setDetail(null)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100" aria-label="Close">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {detail.pts.map((p) => (
                  <li key={p} className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg><span>{p}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a 
                  href="#contact" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900"
                >
                  {t("Talk to us","Hubungi kami")}
                </a>
                <a 
                  href="#approach" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  {t("See our approach","Lihat pendekatan kami")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
