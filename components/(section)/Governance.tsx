"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/types";

type Pillar = {
  k: string;      // title
  v: string;      // short desc (tampil di kartu)
  details: string[]; // detail (muncul di modal)
};

export default function Governance({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);

  const items: Pillar[] = [
    {
      k: t("PMO & SteerCo", "PMO & SteerCo"),
      v: t("Milestone reviews, RAID, value tracking.", "Review milestone, RAID, pelacakan nilai."),
      details: [
        t("Stage-gates & change control clearly defined.", "Stage-gate & kontrol perubahan jelas."),
        t("Weekly burn/earned value snapshot to track momentum.", "Snapshot mingguan burndown/earned value."),
        t("SteerCo cadence, decision log, and action owners.", "Kadet SteerCo, log keputusan, dan penanggung jawab aksi."),
      ],
    },
    {
      k: t("Risk & Security", "Risiko & Keamanan"),
      v: t("Threat modeling, zero-trust, posture.", "Threat modeling, zero-trust, posture."),
      details: [
        t("RAID risks with owners and due dates.", "Risiko RAID dengan PIC & due date."),
        t("Security-by-design and baseline hardening.", "Keamanan-by-design & hardening baseline."),
        t("Incident playbooks and recovery testing.", "Playbook insiden & uji pemulihan."),
      ],
    },
    {
      k: t("Quality & Testing", "Kualitas & Testing"),
      v: t("Shift-left QA, automation, perf.", "QA shift-left, automasi, performa."),
      details: [
        t("Test pyramid (unit → e2e) with coverage gates.", "Piramida test (unit → e2e) + gate coverage."),
        t("Performance & error budgets enforced.", "Anggaran performa & error budget ditegakkan."),
        t("Defect triage and SLA tracking.", "Triage defect & pelacakan SLA."),
      ],
    },
    {
      k: t("Compliance & Privacy", "Kepatuhan & Privasi"),
      v: t("ISO/SOC/PCI, DPIA, data governance.", "ISO/SOC/PCI, DPIA, tata kelola data."),
      details: [
        t("Control mapping (ISO 27001 / SOC 2 / PCI).", "Pemetaan kontrol (ISO 27001 / SOC 2 / PCI)."),
        t("DPIA & records of processing activities.", "DPIA & catatan aktivitas pemrosesan."),
        t("Data retention & periodic access reviews.", "Retensi data & review akses berkala."),
      ],
    },
  ];

  // Modal state
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? items[openIndex] : null;

  // Refs untuk fokus kembali ke kartu pemicu
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (idx: number) => setOpenIndex(idx);
  const closeModal = () => setOpenIndex(null);

  // Body scroll lock + focus management
  useEffect(() => {
    if (openIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = prevOverflow;
        triggerRefs.current[openIndex!]?.focus();
      };
    }
  }, [openIndex]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="governance" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {t("Delivery governance", "Tata kelola delivery")}
            </h2>
            <a href="#contact" className="text-sm underline underline-offset-4">
              {t("Request our PMO playbook", "Minta PMO playbook")}
            </a>
          </div>

          {/* Grid: interaksi modern dengan animasi */}
          <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 gap-6 text-sm">
            {items.map(({ k, v }, idx) => (
              <div
                key={k}
                ref={(el: HTMLDivElement | null): void => { triggerRefs.current[idx] = el; }}
                onClick={() => openModal(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-expanded={openIndex === idx}
                aria-controls="gov-modal"
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50/50 to-white p-5 
                           transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-300
                           cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
              >
                {/* Gradient accent yang muncul saat hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Spotlight effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 p-2 ring-1 ring-gray-200/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-gray-700 transition-colors duration-300 group-hover:text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6h16M4 12h16M4 18h8" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-black">{k}</div>
                      <div className="mt-1.5 text-gray-600 leading-relaxed">{v}</div>
                    </div>
                  </div>

                  {/* Progress bar animasi */}
                  <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500 group-hover:w-full" />

                  {/* Baris bawah: hanya chevron */}
                  <div className="mt-4 flex items-center justify-end">
                    <div className="rounded-full bg-gray-100 p-1.5 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 group-hover:shadow-sm">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* End Grid */}
        </div>
      </div>

      {/* Modal via Portal */}
      {active &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 sm:px-6 lg:px-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gov-modal-title"
            id="gov-modal"
          >
            {/* Overlay dapat diklik untuk close */}
            <button
              type="button"
              aria-label={t("Close overlay", "Tutup overlay")}
              onClick={closeModal}
              className="absolute inset-0 bg-gray-50/80"
            />

            {/* Konten modal */}
            <div
              className="relative z-[1010] w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md ring-1 ring-inset ring-gray-200"
              role="document"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 id="gov-modal-title" className="text-lg font-medium">
                    {active.k}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{active.v}</p>
                </div>

                {/* ⤵️ Ganti tombol teks 'Tutup' → ikon '×' di header */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeModal}
                  aria-label={t("Close dialog", "Tutup dialog")}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm leading-none"
                >
                  ×
                </button>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                {active.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-end">
                {/* ⤵️ Klik 'Hubungi kami' menutup modal */}
                <a
                  href="#contact"
                  onClick={closeModal}
                  className="text-sm underline underline-offset-4"
                >
                  {t("Contact us", "Hubungi kami")}
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
