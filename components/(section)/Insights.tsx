"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "EN" | "ID";

type Insight = {
  cat: string;
  title: string;
  summary: string;
  date: string;
  read: string;
  tags: string[];
  body: string[];
  image: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  relatedTopics?: string[];
};

export default function Insights({ lang = "EN" }: { lang?: Lang }) {
  const t = useMemo(() => (en: string, id: string) => (lang === "EN" ? en : id), [lang]);

  const [open, setOpen] = useState<null | number>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const articles: Insight[] = [
    {
      cat: t("Thought Leadership", "Thought Leadership"),
      title: t("Responsible AI in regulated industries", "AI bertanggung jawab di industri teregulasi"),
      summary: t(
        "Practical governance patterns to deploy GenAI safely without slowing delivery.",
        "Pola tata kelola praktis untuk menerapkan GenAI secara aman tanpa menghambat delivery."
      ),
      date: t("Oct 2025", "Okt 2025"),
      read: t("7 min read", "7 menit baca"),
      tags: [t("Governance", "Tata Kelola"), t("Risk", "Risiko"), t("Compliance", "Kepatuhan")],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      author: {
        name: "Sarah Chen",
        role: t("Principal AI Architect", "Principal AI Architect"),
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "Highly regulated sectors need explicit guardrails for GenAI. Start with a risk taxonomy tied to data sensitivity levels, model criticality, and user impact. Map each class to controls: human-in-the-loop, red-team tests, prompt/response logging, and automated PII scrubbing.",
          "Sektor teregulasi memerlukan pagar pembatas eksplisit untuk GenAI. Mulailah dengan taksonomi risiko yang terkait tingkat sensitivitas data, kekritisan model, dan dampak ke pengguna. Petakan tiap kelas ke kontrol: human-in-the-loop, uji red-team, logging prompt/respons, dan pembersihan PII otomatis."
        ),
        t(
          "Adopt model cards and decision records. Every model change (prompt, policy, or weights) should capture purpose, datasets, evaluations, and rollback. Pair this with an approval workflow and a runtime policy engine (e.g., allow/deny patterns by data domain).",
          "Gunakan model card dan catatan keputusan. Setiap perubahan model (prompt, policy, atau bobot) harus memuat tujuan, dataset, evaluasi, dan rencana rollback. Pasangkan dengan alur persetujuan dan policy engine runtime (mis. pola allow/deny per domain data)."
        ),
        t(
          "Validate continuously: offline tests for safety/quality, canary in production with shadow traffic, and KPIs tied to harm prevention (false accept/deny) and business value. Treat governance as code so it's versioned, testable, and auditable.",
          "Validasi berkelanjutan: uji offline untuk keselamatan/kualitas, canary di produksi dengan shadow traffic, serta KPI yang terkait pencegahan dampak (false accept/deny) dan nilai bisnis. Perlakukan tata kelola sebagai kode agar terversi, dapat diuji, dan dapat diaudit."
        ),
      ],
      relatedTopics: ["MLOps", "Compliance", "Risk Management"],
    },
    {
      cat: t("Cloud & FinOps", "Cloud & FinOps"),
      title: t("FinOps for GenAI: unit economics that actually scale", "FinOps untuk GenAI: unit ekonomi yang benar-benar skala"),
      summary: t(
        "From token budgets to cache hit-rates—how to make GenAI costs predictable.",
        "Dari anggaran token hingga rasio cache hit—cara membuat biaya GenAI dapat diprediksi."
      ),
      date: t("Sep 2025", "Sep 2025"),
      read: t("6 min read", "6 menit baca"),
      tags: [t("FinOps", "FinOps"), t("Cost", "Biaya"), t("GenAI", "GenAI")],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      author: {
        name: "Michael Rodriguez",
        role: t("Cloud Architect", "Cloud Architect"),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "Build a cost model per transaction. Expose 'cost per successful task' to product and SRE dashboards. Optimize via prompt compression, response truncation, and tool-use gating. Track cache hit-rates and retrieval costs separately.",
          "Bangun model biaya per transaksi. Tampilkan 'biaya per tugas berhasil' pada dashboard produk dan SRE. Optimalkan dengan kompresi prompt, pemangkasan respons, dan pembatasan penggunaan tool. Lacak rasio cache hit dan biaya retrieval secara terpisah."
        ),
        t(
          "Right-size hardware for training/inference, batch low-priority workloads, and set budgets with alerts per tenant. Cost guardrails should fail closed: if limits are hit, degrade gracefully with smaller context or fallback models.",
          "Sesuaikan hardware untuk training/inference, jalankan batch untuk beban prioritas rendah, dan tetapkan anggaran dengan peringatan per tenant. Guardrail biaya harus fail-closed: jika limit tercapai, lakukan degradasi bertahap dengan konteks lebih kecil atau model fallback."
        ),
        t(
          "Publish unit economics in release notes so teams see the trade-offs. Tie savings to a backlog of cost stories—turn FinOps into a product capability, not an afterthought.",
          "Publikasikan unit ekonomi di release note agar tim memahami trade-off. Kaitkan penghematan ke backlog 'cost stories'—jadikan FinOps sebagai kapabilitas produk, bukan renungan belakangan."
        ),
      ],
      relatedTopics: ["Cloud Cost", "Optimization", "GenAI"],
    },
    {
      cat: t("Platform Engineering", "Platform Engineering"),
      title: t("Paved roads for multi-cloud: shipping faster without drift", "Paved road multi-cloud: kirim lebih cepat tanpa drift"),
      summary: t(
        "Golden paths, self-service templates, and policy as code that developers actually love.",
        "Golden path, template self-service, dan policy as code yang disukai developer."
      ),
      date: t("Aug 2025", "Agu 2025"),
      read: t("8 min read", "8 menit baca"),
      tags: [t("IDP", "IDP"), t("SRE", "SRE"), t("DevEx", "DevEx")],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
      author: {
        name: "Alex Kumar",
        role: t("Staff Platform Engineer", "Staff Platform Engineer"),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "An Internal Developer Platform should reduce cognitive load. Provide composable templates (service, batch, event) with baked-in security, observability, and cost defaults. Expose a catalog and scorecards to show drift and debt.",
          "Internal Developer Platform harus mengurangi beban kognitif. Sediakan template yang dapat dikomposisi (service, batch, event) dengan default keamanan, observabilitas, dan biaya. Tampilkan katalog dan scorecard untuk memantau drift dan utang teknis."
        ),
        t(
          "Standardize release trains and SLIs/SLOs per class of service. A small platform team can enable dozens of product squads if the paved roads are delightful and well-documented.",
          "Standarkan release train dan SLI/SLO per kelas layanan. Tim platform kecil bisa memberdayakan banyak squad produk jika paved road-nya menyenangkan dan terdokumentasi baik."
        ),
        t(
          "Measure DevEx: lead time, change fail rate, and onboarding time. Your platform is successful when teams ship 'boring' changes confidently and reserve creativity for product value.",
          "Ukur DevEx: lead time, change fail rate, dan waktu onboarding. Platform sukses ketika tim mengirim perubahan 'membosankan' dengan percaya diri dan menyimpan kreativitas untuk nilai produk."
        ),
      ],
      relatedTopics: ["DevOps", "Developer Experience", "Automation"],
    },
    {
      cat: t("Data & AI", "Data & AI"),
      title: t("From RAG to real-time: production patterns that survive traffic spikes", "Dari RAG ke real-time: pola produksi yang tahan lonjakan trafik"),
      summary: t(
        "Architectures that combine retrieval, throttling, and cache tiers without losing relevance.",
        "Arsitektur yang menggabungkan retrieval, throttling, dan tier cache tanpa kehilangan relevansi."
      ),
      date: t("Jul 2025", "Jul 2025"),
      read: t("7 min read", "7 menit baca"),
      tags: [t("RAG", "RAG"), t("Realtime", "Realtime"), t("Caching", "Caching")],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
      author: {
        name: "Dr. Lisa Wang",
        role: t("ML Engineering Lead", "ML Engineering Lead"),
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "Design for surge first: queue work, throttle tokens per tenant, and isolate vector stores by business domain. Warm caches for hot documents and pre-compute embeddings on ingestion.",
          "Rancang untuk lonjakan terlebih dahulu: antrekan pekerjaan, throttle token per tenant, dan isolasi vector store per domain bisnis. Hangatkan cache untuk dokumen panas dan pra-komputasi embedding saat ingestion."
        ),
        t(
          "Use freshness windows in retrieval and a re-ranking step to balance recency with authority. Track answerability and coverage so product owners see quality like they see latency.",
          "Gunakan freshness window pada retrieval dan langkah re-ranking untuk menyeimbangkan kebaruan dengan otoritas. Lacak answerability dan coverage agar owner produk melihat kualitas seperti mereka melihat latensi."
        ),
        t(
          "When latency matters, prefer lightweight tools: compact rerankers, response summarizers at the edge, and partial streaming to keep users engaged.",
          "Saat latensi penting, gunakan tool ringan: reranker ringkas, peringkas respons di edge, dan streaming parsial untuk menjaga keterlibatan pengguna."
        ),
      ],
      relatedTopics: ["Vector DB", "Real-time Systems", "AI Architecture"],
    },
    {
      cat: t("Security", "Keamanan"),
      title: t("Zero-trust APIs for citizen-scale services", "API zero-trust untuk layanan skala warga"),
      summary: t(
        "Policy enforcement at the edge with device posture, consent, and rate policies.",
        "Penegakan kebijakan di edge dengan posture perangkat, consent, dan kebijakan laju."
      ),
      date: t("Jun 2025", "Jun 2025"),
      read: t("5 min read", "5 menit baca"),
      tags: [t("Zero-trust", "Zero-trust"), t("API", "API"), t("SRE", "SRE")],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
      author: {
        name: "James Taylor",
        role: t("Security Architect", "Security Architect"),
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "Make identity and device posture first-class citizens. Evaluate every request with short-lived tokens, signed claims, and risk scoring. Enforce policies near the user to reduce blast radius.",
          "Jadikan identitas dan posture perangkat sebagai kelas utama. Evaluasi setiap request dengan token berumur pendek, klaim bertanda tangan, dan penilaian risiko. Terapkan kebijakan sedekat mungkin dengan pengguna untuk mengurangi dampak."
        ),
        t(
          "Adopt consent ledgers for data operations. Provide transparent logs to users and regulators; pair with anonymization for analytics.",
          "Gunakan consent ledger untuk operasi data. Sediakan log transparan untuk pengguna dan regulator; padukan dengan anonimisasi untuk analitik."
        ),
        t(
          "Chaos-test auth and rate-limit systems. Your SRE playbooks should include credential stuffing drills, circuit-breakers, and gradual degradation strategies.",
          "Uji chaos pada sistem otentikasi dan rate-limit. Playbook SRE Anda harus memuat latihan credential-stuffing, circuit-breaker, dan strategi degradasi bertahap."
        ),
      ],
      relatedTopics: ["Zero Trust", "API Security", "Identity Management"],
    },
    {
      cat: t("Delivery", "Delivery"),
      title: t("DevSecOps for AI features: aligning risk with speed", "DevSecOps untuk fitur AI: menyelaraskan risiko dengan kecepatan"),
      summary: t(
        "Threat modeling, safety tests, and deployment rings that don't slow product teams.",
        "Threat modeling, uji keselamatan, dan ring deployment yang tidak memperlambat tim produk."
      ),
      date: t("May 2025", "Mei 2025"),
      read: t("6 min read", "6 menit baca"),
      tags: [t("DevSecOps", "DevSecOps"), t("MLOps", "MLOps"), t("Quality", "Kualitas")],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
      author: {
        name: "Maria Santos",
        role: t("DevSecOps Lead", "DevSecOps Lead"),
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      },
      body: [
        t(
          "Shift-left safety: integrate jailbreak tests, prompt injections, and unsafe content checks into CI pipelines. Gate releases on safety score thresholds, not just accuracy.",
          "Shift-left keselamanan: integrasikan uji jailbreak, injeksi prompt, dan deteksi konten berbahaya dalam pipeline CI. Jadikan rilis bergantung pada ambang skor keselamatan, bukan hanya akurasi."
        ),
        t(
          "Use deployment rings (dev → canary → cohort) tied to risk classes. Collect user feedback signals and human review outcomes as training data for future iterations.",
          "Gunakan ring deployment (dev → canary → kohort) yang terhubung dengan kelas risiko. Kumpulkan sinyal umpan balik pengguna dan hasil tinjauan manusia sebagai data pelatihan untuk iterasi berikutnya."
        ),
        t(
          "Automate incident response for AI features: runbooks for model rollback, prompt policy downgrades, and feature flags to isolate problem surfaces quickly.",
          "Otomatiskan respons insiden untuk fitur AI: runbook rollback model, penurunan kebijakan prompt, dan feature flag untuk mengisolasi masalah dengan cepat."
        ),
      ],
      relatedTopics: ["CI/CD", "Security Testing", "AI Safety"],
    },
  ];

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.cat)))];

  const filteredArticles =
    activeFilter === "All" ? articles : articles.filter((a) => a.cat === activeFilter);

  // Keyboard navigation for modal & carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        if (e.key === "ArrowLeft") {
          setOpen((idx) => {
            if (idx === null) return idx;
            const newIdx = (idx - 1 + filteredArticles.length) % filteredArticles.length;
            return newIdx;
          });
        }
        if (e.key === "ArrowRight") {
          setOpen((idx) => {
            if (idx === null) return idx;
            const newIdx = (idx + 1) % filteredArticles.length;
            return newIdx;
          });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filteredArticles.length]);

  // Focus trap for modal
  useEffect(() => {
    if (open === null) return;
    const focusable = () =>
      modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    const firstFocus = () => focusable()?.[0]?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    firstFocus();
    const current = modalRef.current;
    current?.addEventListener("keydown", onKeyDown);
    return () => current?.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="min-h-screen bg-white-500">
      <section id="insights" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {t("Insights", "Wawasan")}
              </h2>
              <p className="mt-2 text-gray-600">
                {t(
                  "Thought leadership and technical deep dives",
                  "Kepemimpinan pemikiran dan pembahasan teknis mendalam"
                )}
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === cat
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Scroller (max 3 visible, the rest scroll to the right) */}
          <div className="relative">
            {/* Left Arrow (optional) */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollerRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1"
            >
              {filteredArticles.map((a, i) => (
                <article
                  key={i}
                  className="
                    snap-start shrink-0
                    basis-[90%] sm:basis-[48%] lg:basis-[32%]
                    group rounded-2xl border border-gray-200 bg-white overflow-hidden
                    shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                  "
                  onClick={() => setOpen(i)}
                >
                  {/* Featured Image */}
                  <div className="aspect-[16/9] relative overflow-hidden bg-gray-900">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur text-gray-900">
                        {a.cat}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-gray-900 transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{a.summary}</p>

                    {/* Meta */}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{a.date}</span>
                        <span>•</span>
                        <span>{a.read}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[11px] border border-gray-300 bg-gray-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="mt-4 inline-flex items-center text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                      {t("Read article", "Baca artikel")}
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Arrow (optional) */}
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollerRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="insight-title"
            ref={modalRef}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="relative aspect-[21/9] overflow-hidden bg-gray-900">
              <img
                src={filteredArticles[open].image}
                alt={filteredArticles[open].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((idx) => (idx === null ? idx : (idx - 1 + filteredArticles.length) % filteredArticles.length));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                aria-label="Previous article"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((idx) => (idx === null ? idx : (idx + 1) % filteredArticles.length));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                aria-label="Next article"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-900 uppercase tracking-wide">
                  {filteredArticles[open].cat}
                </span>

                <h3 id="insight-title" className="text-3xl sm:text-4xl font-bold mt-4 leading-tight text-gray-900">
                  {filteredArticles[open].title}
                </h3>

                {/* Meta Info */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{filteredArticles[open].date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{filteredArticles[open].read}</span>
                  </div>
                </div>

                {/* Author */}
                {filteredArticles[open].author && (
                  <div className="mt-6 flex items-center gap-3 pb-6 border-b border-gray-200">
                    <img
                      src={filteredArticles[open].author!.avatar}
                      alt={filteredArticles[open].author!.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{filteredArticles[open].author!.name}</div>
                      <div className="text-sm text-gray-600">{filteredArticles[open].author!.role}</div>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="mt-8 prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {filteredArticles[open].body.map((p, idx) => (
                    <p key={idx} className="mb-5 text-gray-800 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
                    {t("Topics", "Topik")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredArticles[open].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                {filteredArticles[open].relatedTopics && (
                  <div className="mt-6">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
                      {t("Related Topics", "Topik Terkait")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredArticles[open].relatedTopics!.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-200">
                  <a
                    href="#contact"
                    onClick={() => setOpen(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-900 transition-colors shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {t("Talk to an expert", "Bicara dengan ahli")}
                  </a>
                  <a
                    href="#approach"
                    onClick={() => setOpen(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {t("See our approach", "Lihat pendekatan kami")}
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: filteredArticles[open].title,
                          text: filteredArticles[open].summary,
                        });
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {t("Share", "Bagikan")}
                  </button>
                </div>

                {/* Navigation Hint */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  {t(
                    "Use ← → arrow keys or swipe to navigate articles",
                    "Gunakan tombol ← → atau swipe untuk navigasi artikel"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
