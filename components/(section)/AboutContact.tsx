"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";

/**
 * About + Contact (industry‑tailored, v3)
 * - Grayscale UI, no animations
 * - Replaces "RFP & Partnerships" with interactive Pricing & Packages
 * - Currency toggle (IDR/USD)
 * - Engagement tabs (Sprint / Project / Squad)
 * - Sliders/inputs to estimate price; one‑click prefill into Contact form
 * - Keeps existing industry/use‑case logic
 */

export default function AboutContact({ lang }: { lang: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);

  // Local UI states
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { ok: boolean; msg: string }>(null);
  const [details, setDetails] = useState("");
  const [industry, setIndustry] = useState<string>("financial");
  const [useCases, setUseCases] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState<"Email" | "WhatsApp" | "Phone">("Email");
  const [ndaRequired, setNdaRequired] = useState(false);
  const [consent, setConsent] = useState(false);
  const [successGoals, setSuccessGoals] = useState<string[]>([]);
  const [phase, setPhase] = useState<string>("discover");
  const [attachmentUrl, setAttachmentUrl] = useState(""); // RFP/brief link

  // Anti‑spam
  const [hp, setHp] = useState(""); // honeypot

  // Best effort local timezone + UTM capture
  const [timezone, setTimezone] = useState<string>("UTC");
  const [utm, setUtm] = useState<Record<string, string>>({});

  // Ref to control the Budget <select> from Pricing section
  const budgetRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    } catch {}
    // Query param prefill: ?industry=financial&useCase=KYC&ref=linkedin
    try {
      const sp = new URLSearchParams(window.location.search);
      const ind = sp.get("industry");
      if (ind && INDUSTRIES.some((i) => i.key === ind)) setIndustry(ind);
      const ucs = sp.getAll("useCase");
      if (ucs.length) setUseCases(ucs);
      const capture: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "ref"].forEach((k) => {
        const v = sp.get(k);
        if (v) capture[k] = v;
      });
      setUtm(capture);
    } catch {}
  }, []);

  // Dictionaries
  const INDUSTRIES = [
    { key: "financial", label: t("Financial Services", "Jasa Keuangan") },
    { key: "telecom", label: t("Telecommunications", "Telekomunikasi") },
    { key: "public", label: t("Public Sector", "Sektor Publik") },
    { key: "health", label: t("Healthcare", "Kesehatan") },
    { key: "retail", label: t("Retail & E‑commerce", "Ritel & E‑commerce") },
    { key: "energy", label: t("Energy & Resources", "Energi & Sumber Daya") },
    { key: "other", label: t("Other", "Lainnya") },
  ] as const;

  const USE_CASES: Record<string, string[]> = {
    financial: [
      t("Digital onboarding & KYC", "Onboarding digital & KYC"),
      t("Risk analytics & fraud", "Analitik risiko & fraud"),
      t("Open banking & APIs", "Open banking & API"),
      t("Credit decisioning", "Keputusan kredit"),
    ],
    telecom: [
      t("AIOps & observability", "AIOps & observability"),
      t("BSS/OSS modernization", "Modernisasi BSS/OSS"),
      t("5G network slicing", "Network slicing 5G"),
      t("Self‑service portals", "Portal swalayan"),
    ],
    public: [
      t("Digital ID & e‑Gov", "Identitas digital & e‑Gov"),
      t("Citizen services", "Layanan warga"),
      t("Data exchange & privacy", "Pertukaran data & privasi"),
      t("Anti‑fraud benefits", "Anti‑fraud manfaat"),
    ],
    health: [
      t("EMR interoperability", "Interoperabilitas EMR"),
      t("PHI privacy & security", "Privasi & keamanan PHI"),
      t("AI triage & scheduling", "AI triage & penjadwalan"),
      t("Patient experience", "Pengalaman pasien"),
    ],
    retail: [
      t("Personalization & search", "Personalisasi & pencarian"),
      t("Supply chain visibility", "Visibilitas rantai pasok"),
      t("Fraud & chargeback", "Fraud & chargeback"),
      t("Pricing & promotions", "Harga & promosi"),
    ],
    energy: [
      t("Asset performance mgmt", "Manajemen performa aset"),
      t("Predictive maintenance", "Perawatan prediktif"),
      t("ESG data & reporting", "Data & pelaporan ESG"),
      t("Field workforce apps", "Aplikasi pekerja lapangan"),
    ],
    other: [
      t("Discovery & strategy", "Discovery & strategi"),
      t("Architecture & platform", "Arsitektur & platform"),
      t("Delivery acceleration", "Akselerasi delivery"),
    ],
  };

  const DETAILS_HINT: Record<string, string> = {
    financial: t(
      "e.g., current KYC flow, target TtKYC, regulators (OJK/BI), regions",
      "cth: alur KYC saat ini, target waktu KYC, regulator (OJK/BI), wilayah"
    ),
    telecom: t(
      "e.g., observability stack, DC count, incident MTTR, 5G scope",
      "cth: tumpukan observability, jumlah DC, MTTR insiden, cakupan 5G"
    ),
    public: t(
      "e.g., population scale, privacy reqs, ID methods, failover regions",
      "cth: skala populasi, kebutuhan privasi, metode ID, wilayah failover"
    ),
    health: t(
      "e.g., EMR vendor, PHI scope, integrations, clinic/hospital count",
      "cth: vendor EMR, cakupan PHI, integrasi, jumlah klinik/RS"
    ),
    retail: t(
      "e.g., MAU/DAU, SKU count, conversion goals, returns/fraud pain",
      "cth: MAU/DAU, jumlah SKU, target konversi, isu retur/fraud"
    ),
    energy: t(
      "e.g., asset types, sites, downtime cost, maintenance cadence",
      "cth: jenis aset, lokasi, biaya downtime, frekuensi perawatan"
    ),
    other: t("Add any context or constraints", "Tambahkan konteks atau batasan"),
  };

  const COMPLIANCE = [
    { key: "iso27001", label: "ISO 27001" },
    { key: "soc2", label: "SOC 2" },
    { key: "gdpr", label: "GDPR / PDPA" },
    { key: "hipaa", label: t("HIPAA / PHI", "HIPAA / PHI") },
  ];

  const RECOMMENDED_BY_INDUSTRY: Record<string, string[]> = {
    financial: ["iso27001", "soc2", "gdpr"],
    telecom: ["iso27001", "soc2"],
    public: ["iso27001", "gdpr"],
    health: ["iso27001", "hipaa"],
    retail: ["iso27001", "gdpr"],
    energy: ["iso27001", "soc2"],
    other: ["iso27001"],
  };

  const GOALS = [
    t("Reduce MTTR", "Kurangi MTTR"),
    t("Improve TtKYC", "Percepat waktu KYC"),
    t("Lower infra cost", "Turunkan biaya infra"),
    t("Increase conversion", "Naikkan konversi"),
    t("Meet compliance", "Penuhi kepatuhan"),
    t("Improve SLOs", "Tingkatkan SLO"),
  ];

  const PHASES = [
    { key: "discover", label: t("Discover", "Discovery") },
    { key: "design", label: t("Design", "Desain") },
    { key: "build", label: t("Build", "Bangun") },
    { key: "run", label: t("Run & Scale", "Operasi & Skala") },
  ];

  function toggleUseCase(uc: string) {
    setUseCases((prev) => (prev.includes(uc) ? prev.filter((i) => i !== uc) : [...prev, uc]));
  }
  function toggleCompliance(key: string) {
    setCompliance((prev) => (prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]));
  }
  function toggleGoal(g: string) {
    setSuccessGoals((prev) => (prev.includes(g) ? prev.filter((i) => i !== g) : [...prev, g]));
  }

  // ===== Pricing & Packages state =====
  type Currency = "IDR" | "USD";
  const [currency, setCurrency] = useState<Currency>("IDR");
  type Engagement = "sprint" | "project" | "squad";
  const [engagement, setEngagement] = useState<Engagement>("sprint");

  // Controls for each mode
  const [sprints, setSprints] = useState<number>(3); // 1..6
  const [projectScope, setProjectScope] = useState<"small" | "medium" | "large">("medium");
  const [teamSize, setTeamSize] = useState<number>(4); // 2..8
  const [months, setMonths] = useState<number>(3); // 1..12

  // Rates (aligned to Budget dropdown buckets)
  const RATES = {
    IDR: {
      sprintBase: 90_000_000, // per 2‑week sprint (3–4 person squad)
      project: { small: 300_000_000, medium: 700_000_000, large: 1_600_000_000 },
      squadPerFTE: 120_000_000, // monthly per FTE
    },
    USD: {
      sprintBase: 12_000,
      project: { small: 25_000, medium: 70_000, large: 120_000 },
      squadPerFTE: 8_000,
    },
  } as const;

  function fmt(n: number, cur: Currency) {
    const locale = lang === "EN" ? "en-US" : "id-ID";
    return new Intl.NumberFormat(locale, { style: "currency", currency: cur }).format(n);
  }

  function computeEstimate(): { total: number; monthly?: number } {
    const r = RATES[currency];
    if (engagement === "sprint") {
      const total = r.sprintBase * sprints;
      return { total };
    }
    if (engagement === "project") {
      return { total: r.project[projectScope] };
    }
    // squad
    const monthly = r.squadPerFTE * teamSize;
    const total = monthly * months;
    return { total, monthly };
  }

  function budgetBucket(amount: number, cur: Currency): string {
    if (cur === "USD") {
      if (amount < 25_000) return "$10k – $25k";
      if (amount < 100_000) return "$25k – $100k";
      return "$100k+";
    } else {
      if (amount < 400_000_000) return "Rp 150jt – Rp 400jt";
      if (amount < 1_600_000_000) return "Rp 400jt – Rp 1,6M";
      return "Rp 1,6M+";
    }
  }

  function setBudgetSelect(labelOrValue: string) {
    const sel = budgetRef.current;
    if (!sel) return;
    // Try by value first
    for (let i = 0; i < sel.options.length; i++) {
      const opt = sel.options[i];
      if (opt.value === labelOrValue || opt.text === labelOrValue) {
        sel.selectedIndex = i;
        return;
      }
    }
  }

  function handleSelectPackage(tier: string) {
    const { total, monthly } = computeEstimate();
    const bucket = budgetBucket(total, currency);
    setBudgetSelect(bucket);

    const summary =
      `\n\n[Prefill] ${lang === "EN" ? "Selected package" : "Paket dipilih"}: ${tier.toUpperCase()}\n` +
      (engagement === "sprint"
        ? `${sprints} ${lang === "EN" ? "sprint(s)" : "sprint"} (~${lang === "EN" ? "2 weeks each" : "2 minggu/sprint"})\n`
        : engagement === "project"
        ? `${lang === "EN" ? "Scope" : "Lingkup"}: ${projectScope.toUpperCase()}\n`
        : `${lang === "EN" ? "Team size" : "Ukuran tim"}: ${teamSize} • ${months} ${lang === "EN" ? "month(s)" : "bulan"}\n`) +
      `${lang === "EN" ? "Estimate" : "Estimasi"}: ${fmt(total, currency)}${monthly ? ` (${fmt(monthly, currency)} / ${lang === "EN" ? "month" : "bulan"})` : ""}\n` +
      `${lang === "EN" ? "Budget bucket" : "Kisaran anggaran"}: ${bucket}\n` +
      `${lang === "EN" ? "Currency" : "Mata uang"}: ${currency}`;

    setDetails((prev) => (prev ? prev + summary : summary.trimStart()));
    setDone({ ok: true, msg: t("Package copied to the form area.", "Paket disalin ke area formulir.") });
  }

  function PricingCard() {
    const { total, monthly } = computeEstimate();

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h3 className="text-lg font-semibold">{t("Pricing & Packages", "Range & Paket Harga")}</h3>

        {/* Currency toggle */}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-700">
          <span className="font-medium">{t("Currency", "Mata uang")}</span>
          <div className="inline-flex rounded-full border border-gray-300 overflow-hidden">
            {(["IDR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={[
                  "px-3 py-1.5",
                  currency === c ? "bg-black text-white" : "bg-white text-gray-700",
                ].join(" ")}
                aria-pressed={currency === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Engagement tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {([
            { k: "sprint", l: t("Sprint (2 weeks)", "Sprint (2 minggu)") },
            { k: "project", l: t("Project (fixed scope)", "Proyek (lingkup tetap)") },
            { k: "squad", l: t("Squad (monthly)", "Skuad (bulanan)") },
          ] as { k: Engagement; l: string }[]).map((tab) => (
            <button
              key={tab.k}
              type="button"
              onClick={() => setEngagement(tab.k)}
              className={[
                "rounded-full border px-3 py-1 text-xs",
                engagement === tab.k
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
              ].join(" ")}
              aria-pressed={engagement === tab.k}
            >
              {tab.l}
            </button>
          ))}
        </div>

        {/* Controls per engagement */}
        <div className="mt-6 space-y-5 text-sm text-gray-700">
          {engagement === "sprint" && (
            <div>
              <label className="font-medium">{t("Number of sprints", "Jumlah sprint")}: {sprints}</label>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={sprints}
                onChange={(e) => setSprints(Number(e.target.value))}
                className="mt-2 w-full"
              />
              <ul className="mt-3 list-disc pl-5 text-xs text-gray-600 space-y-1">
                <li>{t("Each sprint includes strategy, design, and build focus.", "Setiap sprint mencakup strategi, desain, dan build.")}</li>
                <li>{t("Useful for discovery, PoC, or incremental delivery.", "Cocok untuk discovery, PoC, atau delivery bertahap.")}</li>
              </ul>
            </div>
          )}

          {engagement === "project" && (
            <div className="space-y-3">
              <div className="font-medium">{t("Scope size", "Ukuran lingkup")}</div>
              <div className="flex flex-wrap gap-2">
                {(["small", "medium", "large"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setProjectScope(s)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs",
                      projectScope === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                    ].join(" ")}
                    aria-pressed={projectScope === s}
                  >
                    {s === "small" && t("Small (4–8 weeks)", "Kecil (4–8 minggu)")}
                    {s === "medium" && t("Medium (8–16 weeks)", "Sedang (8–16 minggu)")}
                    {s === "large" && t("Large (16+ weeks)", "Besar (16+ minggu)")}
                  </button>
                ))}
              </div>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                <li>{t("Fixed scope, milestones, and acceptance criteria.", "Lingkup tetap, milestone, dan kriteria penerimaan.")}</li>
                <li>{t("Best for MVPs or re‑platforming.", "Cocok untuk MVP atau re‑platforming.")}</li>
              </ul>
            </div>
          )}

          {engagement === "squad" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">{t("Team size (FTE)", "Ukuran tim (FTE)")}: {teamSize}</label>
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <label className="font-medium">{t("Duration (months)", "Durasi (bulan)")}: {months}</label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="mt-2 w-full"
                />
                {monthly && (
                  <div className="mt-2 text-xs text-gray-600">{t("Monthly", "Bulanan")}: <span className="font-medium">{fmt(monthly, currency)}</span></div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Estimate & CTA */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm text-gray-700">
            <div className="font-semibold">{t("Estimated investment", "Perkiraan investasi")}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{fmt(total, currency)}</div>
            <div className="mt-1 text-xs text-gray-600">
              {t("Taxes and tooling not included. Exact quote after scoping.", "Belum termasuk pajak & tooling. Penawaran final setelah scoping.")}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleSelectPackage(engagement)}
              className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900"
            >
              {t("Use this in the form", "Gunakan di formulir")}
            </button>
            <div className="text-xs text-gray-600">
              {t("Will prefill budget and add a summary in Project details.", "Akan mengisi anggaran & menambahkan ringkasan di Detail proyek.")}
            </div>
          </div>
        </div>

        {/* Quick package hints */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs text-gray-700">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="font-semibold text-gray-900">{t("Sprint Pack", "Sprint Pack")}</div>
            <div>{t("2 weeks, outcome‑driven increments.", "2 minggu, inkremen berorientasi hasil.")}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="font-semibold text-gray-900">{t("Project", "Proyek")}</div>
            <div>{t("Fixed scope & milestones.", "Lingkup & milestone tetap.")}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="font-semibold text-gray-900">{t("Dedicated Squad", "Skuad Dedikasi")}</div>
            <div>{t("Monthly, flexible backlog.", "Bulanan, backlog fleksibel.")}</div>
          </div>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDone(null);
    const fd = new FormData(e.currentTarget);

    // Honeypot
    if (hp) {
      setDone({ ok: true, msg: t("Thanks! We’ll get back within 1 business day.", "Terima kasih! Kami akan membalas dalam 1 hari kerja.") });
      setLoading(false);
      return;
    }

    // Basic validation
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const role = String(fd.get("role") || "").trim();
    const budget = String(fd.get("budget") || "").trim();
    const timeline = String(fd.get("timeline") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const detailsText = details.trim();

    if (!name || !email || !detailsText) {
      setDone({ ok: false, msg: t("Please complete required fields.", "Mohon lengkapi kolom wajib.") });
      setLoading(false);
      return;
    }
    if (!consent) {
      setDone({ ok: false, msg: t("Please accept the privacy notice.", "Mohon setujui pemberitahuan privasi.") });
      setLoading(false);
      return;
    }
    if (useCases.length === 0) {
      setDone({ ok: false, msg: t("Select at least one use case.", "Pilih minimal satu use case.") });
      setLoading(false);
      return;
    }

    const { total, monthly } = computeEstimate();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          budget,
          timeline,
          details: detailsText,
          industry,
          useCases,
          compliance,
          ndaRequired,
          contactMethod,
          phone: contactMethod !== "Email" ? phone : undefined,
          timezone,
          successGoals,
          phase,
          attachmentUrl,
          utm,
          // Extra (API expected to accept/ignore unknown keys)
          package: engagement,
          currency,
          estimateTotal: total,
          estimateMonthly: monthly,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.ok ?? true)) {
        setDone({ ok: true, msg: t("Thanks! We’ll get back within 1 business day.", "Terima kasih! Kami akan membalas dalam 1 hari kerja.") });
        (e.target as HTMLFormElement).reset();
        setDetails("");
        setUseCases([]);
        setCompliance([]);
        setNdaRequired(false);
        setContactMethod("Email");
        setConsent(false);
        setSuccessGoals([]);
        setPhase("discover");
        setAttachmentUrl("");
      } else {
        setDone({ ok: false, msg: json?.error || t("Submission failed.", "Gagal mengirim.") });
      }
    } catch (err: any) {
      setDone({ ok: false, msg: err?.message || t("Network error", "Gangguan jaringan") });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* About */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {t("Who we are", "Siapa kami")}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-700">
                {t(
                  "Independent consulting studio helping enterprises accelerate transformation with cloud, data, and design.",
                  "Studio konsultan independen yang membantu perusahaan mempercepat transformasi dengan cloud, data, dan desain."
                )}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {t("ISO‑aligned delivery practices", "Praktik delivery selaras ISO")}
                </li>
                <li className="flex gap-2">
                  <svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {t("Certified cloud & security experts", "Pakar cloud & keamanan tersertifikasi")}
                </li>
                <li className="flex gap-2">
                  <svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {t("Vendor‑neutral recommendations", "Rekomendasi netral vendor")}
                </li>
              </ul>
              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">{t("Financial, Telco, Public", "Keuangan, Telko, Publik")}</div>
                  <div>{t("+ Healthcare, Retail, Energy", "+ Kesehatan, Ritel, Energi")}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">DevSecOps • SRE • IDP</div>
                  <div>Cloud • Data • AI</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">{t("Jakarta & Singapore", "Jakarta & Singapura")}</div>
                  <div>Remote‑first (GMT+7/8)</div>
                </div>
              </div>
            </div>

            {/* Replaced: RFP & Partnerships -> Interactive Pricing */}
            <PricingCard />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Let’s talk", "Ayo berdiskusi")}</h2>
              <p className="mt-2 text-sm text-gray-600">{t("Tell us about your challenge and goals. We’ll respond within 1 business day.", "Ceritakan tantangan dan tujuan Anda. Kami akan merespons dalam 1 hari kerja.")}</p>

              <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">{t("Name", "Nama")}</label>
                    <input name="name" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder={t("Your name", "Nama Anda")} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="you@company.com" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">{t("Company", "Perusahaan")}</label>
                    <input name="company" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Acme, Inc." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t("Role", "Jabatan")}</label>
                    <input name="role" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder={t("e.g., Head of IT", "contoh: Kepala TI")} />
                  </div>
                </div>

                {/* Row 3: Industry + Timeline */}
                <div className="grid sm:grid-cols-2 gap-4">
                <div>
                <label className="text-sm font-medium">{t("Industry", "Industri")}</label>
                <select
                name="industry"
                value={industry}
                onChange={(e) => { setIndustry(e.target.value); setUseCases([]); }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                {INDUSTRIES.map((ind) => (
                <option key={ind.key} value={ind.key}>{ind.label}</option>
                ))}
                </select>
                {/* Recommended compliance note */}
                <div className="mt-1 text-xs text-gray-500">
                {t("Recommended:", "Rekomendasi:")}{" "}
                {RECOMMENDED_BY_INDUSTRY[industry].map((k) => COMPLIANCE.find((c) => c.key === k)?.label).filter(Boolean).join(", ")}
                </div>
                </div>
                <div>
                <label className="text-sm font-medium">{t("Timeline", "Timeline")}</label>
                <select name="timeline" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                <option value="asap">{t("ASAP (≤1 month)", "Secepatnya (≤1 bulan)")}</option>
                <option value="1-3m">{t("1–3 months", "1–3 bulan")}</option>
                <option value=">3m">{t(">3 months", ">3 bulan")}</option>
                </select>
                </div>
                </div>

                {/* Row 4: Budget + Contact method */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">{t("Budget", "Anggaran")}</label>
                    <select name="budget" ref={budgetRef} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                      <option value="tbd">{t("Select / TBD", "Pilih / TBD")}</option>
                      <option>{lang === "EN" ? "$10k – $25k" : "Rp 150jt – Rp 400jt"}</option>
                      <option>{lang === "EN" ? "$25k – $100k" : "Rp 400jt – Rp 1,6M"}</option>
                      <option>{lang === "EN" ? "$100k+" : "Rp 1,6M+"}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t("Preferred contact", "Kontak preferensi")}</label>
                    <select value={contactMethod} onChange={(e) => setContactMethod(e.target.value as any)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                      <option>Email</option>
                      <option>WhatsApp</option>
                      <option>Phone</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: phone conditional */}
                {contactMethod !== "Email" && (
                  <div>
                    <label className="text-sm font-medium">{t("Phone / WhatsApp", "Telepon / WhatsApp")}</label>
                    <input name="phone" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="+62 812‑xxxx‑xxxx" />
                    <div className="mt-1 text-xs text-gray-500">{t("We’ll use this only for scheduling.", "Digunakan hanya untuk penjadwalan.")}</div>
                  </div>
                )}

                {/* Row 6: Use cases (dynamic chips) */}
                <div>
                  <label className="text-sm font-medium">{t("Use cases", "Use case")}</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {USE_CASES[industry]?.map((uc) => (
                      <button
                        type="button"
                        key={uc}
                        onClick={() => toggleUseCase(uc)}
                        className={[
                          "rounded-full border px-3 py-1 text-xs",
                          useCases.includes(uc)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                        ].join(" ")}
                        aria-pressed={useCases.includes(uc)}
                      >
                        {uc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 7: Compliance */}
                <div>
                  <label className="text-sm font-medium">{t("Compliance", "Kepatuhan")}</label>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700">
                    {COMPLIANCE.map((c) => (
                      <label key={c.key} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={compliance.includes(c.key)}
                          onChange={() => toggleCompliance(c.key)}
                          disabled={industry !== "health" && c.key === "hipaa"}
                          title={industry !== "health" && c.key === "hipaa" ? t("Only for Healthcare projects", "Hanya untuk proyek Kesehatan") : undefined}
                        />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 8: Success goals & project phase */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">{t("Success goals", "Tujuan keberhasilan")}</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {GOALS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGoal(g)}
                          className={["rounded-full border px-3 py-1 text-xs",
                            successGoals.includes(g) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                          ].join(" ")}
                          aria-pressed={successGoals.includes(g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t("Project phase", "Fase proyek")}</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PHASES.map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setPhase(p.key)}
                          className={["rounded-full border px-3 py-1 text-xs",
                            phase === p.key ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                          ].join(" ")}
                          aria-pressed={phase === p.key}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 9: Details */}
                <div>
                  <label className="text-sm font-medium">{t("Project details", "Detail proyek")}</label>
                  <textarea
                    name="details"
                    required
                    rows={5}
                    value={details}
                    onChange={(e) => setDetails(e.target.value.slice(0, 1000))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder={`${t("Tell us what you need...", "Ceritakan kebutuhan Anda...")} (${DETAILS_HINT[industry]})`}
                  />
                  <div className="mt-1 text-xs text-gray-500">{details.length}/1000</div>

                  {/* Attachment link */}
                  <div className="mt-3">
                    <label className="text-sm font-medium">{t("RFP / brief link (optional)", "Tautan RFP / brief (opsional)")}</label>
                    <input
                      type="url"
                      value={attachmentUrl}
                      onChange={(e) => setAttachmentUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Row 10: NDA + consent + honeypot */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300" checked={ndaRequired} onChange={(e) => setNdaRequired(e.target.checked)} />
                    <span>{t("NDA required", "Perlu NDA")}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>{t("I agree to the privacy policy", "Saya setuju dengan kebijakan privasi")}</span>
                  </label>
                  {/* Honeypot */}
                  <input
                    name="website"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {t("Timezone", "Zona waktu")}: {timezone}
                    {Object.keys(utm).length > 0 && (
                      <span className="ml-3">· UTM</span>
                    )}
                  </div>
                  <button
                    disabled={loading}
                    className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-900 disabled:opacity-50"
                  >
                    {loading ? t("Sending...", "Mengirim...") : t("Send", "Kirim")}
                  </button>
                </div>

                {done && (
                  <div className={`text-sm ${done.ok ? "text-green-700" : "text-red-700"}`} aria-live="polite" role="status">
                    {done.msg}
                    {done.ok && (
                      <div className="mt-2 text-xs text-gray-600">
                        {t("Tip: You can also email us at", "Tip: Anda juga bisa email ke")} {" "}
                        <a className="underline" href="mailto:hello@signalist.consulting">hello@signalist.consulting</a>.
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold">{t("Offices", "Kantor")}</h3>
              <ul className="mt-3 space-y-3 text-sm text-gray-700">
                <li>
                  <div className="font-medium">Jakarta</div>
                  <div className="text-gray-600">{t("SCBD District", "Kawasan SCBD")}</div>
                </li>
                <li>
                  <div className="font-medium">Singapore</div>
                  <div className="text-gray-600">{t("Marina Bay Area", "Kawasan Marina Bay")}</div>
                </li>
                <li>
                  <div className="font-medium">Remote‑first</div>
                  <div className="text-gray-600">GMT+7 / GMT+8</div>
                </li>
              </ul>

              {/* Replaced the small RFP block with Sales & Pricing */}
              <div className="mt-6 text-sm">
                <div className="font-semibold">{t("Sales & pricing", "Penjualan & harga")}</div>
                <div className="text-gray-700">
                  {t("Questions? Email", "Ada pertanyaan? Email")} {" "}
                  <a href="mailto:hello@signalist.consulting" className="underline">hello@signalist.consulting</a>
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-xs text-gray-600">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">{t("Security & Compliance", "Keamanan & Kepatuhan")}</div>
                  <div>{t("ISO 27001 • SOC 2 • GDPR/PDPA • HIPAA/PHI", "ISO 27001 • SOC 2 • GDPR/PDPA • HIPAA/PHI")}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">{t("Delivery Model", "Model Delivery")}</div>
                  <div>{t("Hybrid onshore/near‑shore • Remote‑first", "Hibrida onshore/near‑shore • Remote‑first")}</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
