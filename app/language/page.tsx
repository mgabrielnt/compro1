"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/types";

export default function LanguagePage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const v = window.localStorage.getItem("lang");
      if (v === "ID" || v === "EN") return v as Lang;
    }
    return "EN";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }
  }, [lang]);

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="w-[min(560px,94vw)] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-black" aria-hidden />
          <span className="font-semibold tracking-tight">Signalist Consulting</span>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Language / Bahasa</h1>
        <p className="mt-2 text-sm text-gray-600">Choose your preferred language. This setting is saved in your browser.</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => setLang("EN")}
            className={`rounded-xl border px-4 py-3 text-left ${lang === "EN" ? "border-black" : "border-gray-300 hover:bg-gray-50"}`}
          >
            <div className="font-medium">English</div>
            <div className="text-xs text-gray-600">Business‑first content</div>
          </button>
          <button
            onClick={() => setLang("ID")}
            className={`rounded-xl border px-4 py-3 text-left ${lang === "ID" ? "border-black" : "border-gray-300 hover:bg-gray-50"}`}
          >
            <div className="font-medium">Bahasa Indonesia</div>
            <div className="text-xs text-gray-600">Konten enterprise berbahasa Indonesia</div>
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">Current: <b>{lang}</b></div>
          <Link href="/" className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900">
            Continue / Lanjut
          </Link>
        </div>
      </div>
    </div>
  );
}
