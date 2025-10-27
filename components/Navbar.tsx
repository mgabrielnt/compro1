"use client";
import type { Lang } from "@/lib/types";

export default function Navbar({
  lang, setLang, open, setOpen,
}: { lang: Lang; setLang: (l: Lang) => void; open: boolean; setOpen: (o: boolean) => void; }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const nav = [
    { id: "services", en: "Services", idn: "Layanan" },
    { id: "cases", en: "Case Studies", idn: "Studi Kasus" },
    { id: "industries", en: "Industries", idn: "Industri" },
    { id: "approach", en: "Approach", idn: "Metodologi" },
    { id: "alliances", en: "Alliances", idn: "Aliansi" },
    { id: "governance", en: "Governance", idn: "Tata Kelola" },
    { id: "insights", en: "Insights", idn: "Wawasan" },
    { id: "about", en: "About", idn: "Tentang" },
    { id: "contact", en: "Contact", idn: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-black" aria-hidden />
          <span className="font-semibold tracking-tight">Signalist Consulting</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map(n => (
            <a key={n.id} href={`#${n.id}`} className="hover:text-black">
              {t(n.en, n.idn)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium hover:bg-gray-100"
            aria-label={t("Toggle language", "Ganti bahasa")}
            onClick={() => setLang(lang === "EN" ? "ID" : "EN")}
          >
            {lang}
          </button>

          <a href="#contact" className="hidden md:inline-flex items-center rounded-full bg-black text-white text-sm font-medium px-4 py-2 hover:bg-gray-900">
            {t("Talk to Us", "Hubungi Kami")}
          </a>

          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-300"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-4 grid gap-3 text-sm">
            {nav.map(n => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="py-2 px-2 rounded-md hover:bg-gray-100">
                {t(n.en, n.idn)}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium">
              {t("Start a project", "Mulai proyek")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
