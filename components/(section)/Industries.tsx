"use client";

import { useEffect, useMemo, useRef, useState, KeyboardEvent } from "react";
import type { Lang } from "@/lib/types";

type IndustryItem = {
  name: string;
  summary: string;
  solutions: string[];
  icon: "bank" | "antenna" | "shield" | "heart" | "bag" | "bolt";
};

export default function Industries({ lang }: { lang: Lang }) {
  const t = useMemo(
    () => (en: string, id: string) => (lang === "EN" ? en : id),
    [lang]
  );
  const [detail, setDetail] = useState<IndustryItem | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ESC to close + focus trap + lock body scroll
  useEffect(() => {
    if (!detail) return;

    const onKey = (e: KeyboardEvent | any) => {
      if (e.key === "Escape") setDetail(null);
    };
    window.addEventListener("keydown", onKey as any);

    // lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus trap
    const focusable = () =>
      modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    const firstFocus = () => focusable()?.[0]?.focus();
    const onTrap = (e: KeyboardEvent | any) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first as HTMLElement).focus();
      }
    };

    firstFocus();
    const current = modalRef.current;
    current?.addEventListener("keydown", onTrap as any);

    return () => {
      window.removeEventListener("keydown", onKey as any);
      current?.removeEventListener("keydown", onTrap as any);
      document.body.style.overflow = prevOverflow;
    };
  }, [detail]);

  const items: IndustryItem[] = [
    {
      name: t("Financial Services", "Jasa Keuangan"),
      summary: t(
        "KYC automation, open-banking, and risk intelligence to grow safely.",
        "Otomasi KYC, open-banking, dan intelijen risiko untuk tumbuh secara aman."
      ),
      solutions: [
        t("Digital onboarding & KYC", "Onboarding digital & KYC"),
        t("Risk analytics & fraud", "Analitik risiko & fraud"),
        t("Open banking & APIs", "Open banking & API"),
      ],
      icon: "bank",
    },
    {
      name: t("Telecommunications", "Telekomunikasi"),
      summary: t(
        "AIOps, modern BSS/OSS, and 5G monetization with reliable observability.",
        "AIOps, BSS/OSS modern, dan monetisasi 5G dengan observabilitas andal."
      ),
      solutions: [
        t("AIOps & observability", "AIOps & observability"),
        t("BSS/OSS modernization", "Modernisasi BSS/OSS"),
        t("5G network slicing", "Network slicing 5G"),
      ],
      icon: "antenna",
    },
    {
      name: t("Public Sector", "Sektor Publik"),
      summary: t(
        "Citizen-scale platforms with digital ID, privacy, and resilient APIs.",
        "Platform skala warga dengan identitas digital, privasi, dan API tangguh."
      ),
      solutions: [
        t("Digital ID & e-Gov", "Identitas digital & e-Gov"),
        t("Citizen services", "Layanan warga"),
        t("Data exchange & privacy", "Pertukaran data & privasi"),
      ],
      icon: "shield",
    },
    {
      name: t("Healthcare", "Kesehatan"),
      summary: t(
        "Interoperable EMR, PHI protection, and AI-assisted operations.",
        "EMR interoperabel, perlindungan PHI, dan operasi berbantu AI."
      ),
      solutions: [
        t("EMR interoperability", "Interoperabilitas EMR"),
        t("PHI privacy & security", "Privasi & keamanan PHI"),
        t("AI triage & scheduling", "AI triage & penjadwalan"),
      ],
      icon: "heart",
    },
    {
      name: t("Retail & E-commerce", "Ritel & E-commerce"),
      summary: t(
        "Personalization, search relevance, and fraud reduction at scale.",
        "Personalisasi, relevansi pencarian, dan pengurangan fraud secara skala."
      ),
      solutions: [
        t("Personalization & search", "Personalisasi & pencarian"),
        t("Supply chain visibility", "Visibilitas rantai pasok"),
        t("Fraud & chargeback", "Fraud & chargeback"),
      ],
      icon: "bag",
    },
    {
      name: t("Energy & Resources", "Energi & Sumber Daya"),
      summary: t(
        "Asset reliability, predictive maintenance, and ESG data integrity.",
        "Keandalan aset, perawatan prediktif, dan integritas data ESG."
      ),
      solutions: [
        t("Asset performance mgmt", "Manajemen performa aset"),
        t("Predictive maintenance", "Perawatan prediktif"),
        t("ESG data & reporting", "Data & pelaporan ESG"),
      ],
      icon: "bolt",
    },
  ];

  const renderIcon = (key: IndustryItem["icon"]) => {
    const base = "h-5 w-5";
    switch (key) {
      case "bank":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10h18M5 10l7-6 7 6M4 10v10m4-10v10m4-10v10m4-10v10m4-10v10" />
          </svg>
        );
      case "antenna":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18m0-6l-3 3m3-3l3 3M4 8a8 8 0 0116 0M6.5 10.5a5.5 5.5 0 0111 0" />
          </svg>
        );
      case "shield":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l7 4v5c0 5-3.5 9-7 9S5 17 5 12V7l7-4z" />
          </svg>
        );
      case "heart":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.8 8.6a5.5 5.5 0 00-9.6-3.9L11 5l-.2-.3A5.5 5.5 0 001.2 8.6C1.2 14 11 21 11 21s9.8-7 9.8-12.4z" />
          </svg>
        );
      case "bag":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7h12l1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L6 7z" />
            <path d="M9 7a3 3 0 016 0" />
          </svg>
        );
      case "bolt":
        return (
          <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="industries" className="relative py-16 sm:py-24">
      {/* Subtle background */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(0,0,0,0.06),rgba(0,0,0,0)_60%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {t("Industries we serve", "Industri yang kami layani")}
        </h2>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.name}
              role="button"
              tabIndex={0}
              onClick={() => setDetail(it)}
              onKeyDown={(e) => {
                if ((e as any).key === "Enter") setDetail(it);
              }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black/20"
              aria-label={t("Open industry details", "Buka detail industri")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-700">
                    {renderIcon(it.icon)}
                  </span>
                  <h3 className="font-semibold text-gray-900">{it.name}</h3>
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{it.summary}</p>

              {/* Solution chips preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {it.solutions.slice(0, 2).map((sol) => (
                  <span
                    key={sol}
                    className="rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-[11px] text-gray-700"
                  >
                    {sol}
                  </span>
                ))}
                {it.solutions.length > 2 && (
                  <span className="text-[11px] text-gray-500">
                    +{it.solutions.length - 2} {t("more", "lainnya")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {detail && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setDetail(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="mx-auto mt-24 w-[min(720px,94vw)] rounded-2xl border border-gray-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-700">
                    {renderIcon(detail.icon)}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {detail.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{detail.summary}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetail(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                  aria-label={t("Close", "Tutup")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>

              {/* Solutions as checklist */}
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                {detail.solutions.map((sol) => (
                  <div
                    key={sol}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start gap-2 text-sm text-gray-800">
                      <svg
                        className="mt-0.5 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{sol}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#services"
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  {t("Map to services", "Peta ke layanan")}
                </a>
                <a
                  href="#contact"
                  onClick={() => setDetail(null)}
                  className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900"
                >
                  {t("Talk to us", "Hubungi kami")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
