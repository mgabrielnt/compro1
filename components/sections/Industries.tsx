"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/types";

type IndustryItem = { name: string; summary: string; solutions: string[] };

export default function Industries({ lang }: { lang: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);
  const [detail, setDetail] = useState<null | IndustryItem>(null);

  const items: IndustryItem[] = [
    {
      name: t("Financial Services", "Jasa Keuangan"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("Digital onboarding & KYC","Onboarding digital & KYC"), t("Risk analytics & fraud","Analitik risiko & fraud"), t("Open banking & APIs","Open banking & API")],
    },
    {
      name: t("Telecommunications", "Telekomunikasi"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("AIOps & observability","AIOps & observability"), t("BSS/OSS modernization","Modernisasi BSS/OSS"), t("5G network slicing","Network slicing 5G")],
    },
    {
      name: t("Public Sector", "Sektor Publik"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("Digital ID & e‑Gov","Identitas digital & e‑Gov"), t("Citizen services","Layanan warga"), t("Data exchange & privacy","Pertukaran data & privasi")],
    },
    {
      name: t("Healthcare", "Kesehatan"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("EMR interoperability","Interoperabilitas EMR"), t("PHI privacy & security","Privasi & keamanan PHI"), t("AI triage & scheduling","AI triage & penjadwalan")],
    },
    {
      name: t("Retail & E‑commerce", "Ritel & E‑commerce"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("Personalization & search","Personalisasi & pencarian"), t("Supply chain visibility","Visibilitas rantai pasok"), t("Fraud & chargeback","Fraud & chargeback")],
    },
    {
      name: t("Energy & Resources", "Energi & Sumber Daya"),
      summary: t("Modernization, compliance, and data‑driven growth.", "Modernisasi, kepatuhan, dan pertumbuhan berbasis data."),
      solutions: [t("Asset performance mgmt","Manajemen performa aset"), t("Predictive maintenance","Perawatan prediktif"), t("ESG data & reporting","Data & pelaporan ESG")],
    },
  ];

  return (
    <section id="industries" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Industries we serve", "Industri yang kami layani")}</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.name}
              role="button"
              tabIndex={0}
              onClick={() => setDetail(it)}
              onKeyDown={(e) => { if ((e as any).key === "Enter") setDetail(it); }}
              className="rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{it.name}</h3>
                <span className="text-sm">→</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{it.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setDetail(null)}>
          <div role="dialog" aria-modal="true" className="mx-auto mt-24 w-[min(640px,94vw)] rounded-2xl border border-gray-200 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold">{detail.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{detail.summary}</p>
                </div>
                <button onClick={() => setDetail(null)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100" aria-label="Close">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-gray-700">
                {detail.solutions.map((s) => (
                  <li key={s} className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>{s}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#services" className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">{t("Map to services", "Peta ke layanan")}</a>
                <a href="#contact" className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900">{t("Talk to us", "Hubungi kami")}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
