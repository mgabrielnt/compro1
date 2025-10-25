"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/types";

type CaseItem = {
  cap: string;
  title: string;
  body: string;
  details: string[];
  metrics?: { label: string; value: string }[];
};

export default function CaseStudies({ lang }: { lang: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);
  const [detail, setDetail] = useState<null | CaseItem>(null);

  const cards: CaseItem[] = [
    {
      cap: t("Financial Services", "Jasa Keuangan"),
      title: t("Cloud‑native onboarding reduced time‑to‑KYC by 42%", "Onboarding cloud‑native mengurangi waktu KYC 42%"),
      body: t("Secure platform deployed across 12 regions.", "Platform aman diterapkan di 12 wilayah."),
      details: [
        t("KYC micro‑journeys with risk‑based flows", "Micro‑journey KYC dengan alur berbasis risiko"),
        t("Zero‑trust APIs + consent ledger", "API zero‑trust + consent ledger"),
        t("Observability & SRE SLIs", "Observability & SRE SLI"),
      ],
      metrics: [
        { label: t("TtKYC", "Waktu ke KYC"), value: "-42%" },
        { label: "Regions", value: "12" },
      ],
    },
    {
      cap: t("Telecommunications", "Telekomunikasi"),
      title: t("AIOps cut MTTR by 37% across 5 data centers", "AIOps memangkas MTTR 37% di 5 data center"),
      body: t("Observability stack unified; predictive alerts.", "Observability disatukan; peringatan prediktif."),
      details: [
        t("Log/metrics/traces federated", "Log/metric/trace terfederasi"),
        t("Noise reduction via ML", "Reduksi noise via ML"),
        t("Runbook automation", "Otomasi runbook"),
      ],
      metrics: [
        { label: "MTTR", value: "-37%" },
        { label: "DC", value: "5" },
      ],
    },
    {
      cap: t("Public Sector", "Sektor Publik"),
      title: t("National ID services handle 50M+ monthly requests", "Layanan ID nasional menangani 50J+ request/bulan"),
      body: t("Resilient APIs with zero‑trust architecture.", "API tangguh dengan arsitektur zero‑trust."),
      details: [
        t("Rate‑limit & throttling policy", "Kebijakan rate‑limit & throttling"),
        t("Hardware‑backed keys", "Kunci ber‑hardware"),
        t("Geo‑redundant failover", "Failover geo‑redundan"),
      ],
      metrics: [{ label: t("Monthly req", "Request bulanan"), value: "50M+" }],
    },
  ];

  return (
    <section id="cases" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Selected case studies", "Studi kasus pilihan")}</h2>
          <a href="#contact" className="text-sm underline underline-offset-4">{t("Request the portfolio", "Minta portfolio")}</a>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <article
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => setDetail(c)}
              onKeyDown={(e) => { if ((e as any).key === "Enter") setDetail(c); }}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20"
              aria-label={t("Open case study", "Buka studi kasus")}
            >
              <div className="aspect-[16/9] bg-gray-100" />
              <div className="p-6">
                <div className="text-xs uppercase tracking-wide text-gray-500">{c.cap}</div>
                <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.body}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium group-hover:underline">{t("View details", "Lihat detail")} →</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDetail(null)}>
          <div role="dialog" aria-modal="true" className="mx-auto mt-20 w-[min(760px,94vw)] rounded-2xl border border-gray-200 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">{detail.cap}</div>
                  <h3 className="text-xl font-semibold mt-1">{detail.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{detail.body}</p>
                </div>
                <button onClick={() => setDetail(null)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100" aria-label="Close">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
              {detail.metrics && (
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {detail.metrics.map((m) => (
                    <div key={m.label + m.value} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                      <div className="text-2xl font-semibold">{m.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <ul className="mt-5 space-y-2 text-sm text-gray-700">
                {detail.details.map((d) => (
                  <li key={d} className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>{d}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a 
                  href="#contact" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900"
                >
                  {t("Discuss a similar project", "Diskusikan proyek serupa")}
                </a>
                <a 
                  href="#approach" 
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  {t("See our approach", "Lihat pendekatan kami")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
