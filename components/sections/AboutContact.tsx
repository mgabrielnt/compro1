"use client";

import { useState } from "react";
import type { Lang } from "@/lib/types";

export default function AboutContact({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { ok: boolean; msg: string }>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDone(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          company: payload.company,
          budget: payload.budget,
          details: payload.details,
        }),
      });
      const json = await res.json();
      if (res.ok && json?.ok) setDone({ ok: true, msg: t("Thanks! We’ll get back within 1 business day.", "Terima kasih! Kami akan membalas dalam 1 hari kerja.") });
      else setDone({ ok: false, msg: json?.error || t("Submission failed.", "Gagal mengirim.") });
    } catch (err: any) {
      setDone({ ok: false, msg: err?.message || t("Network error", "Gangguan jaringan") });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section id="about" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Who we are", "Siapa kami")}</h2>
              <p className="mt-3 text-sm sm:text-base text-gray-700">
                {t("Independent consulting studio helping enterprises accelerate transformation with cloud, data, and design.","Studio konsultan independen yang membantu perusahaan mempercepat transformasi dengan cloud, data, dan desain.")}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>{t("ISO‑aligned delivery practices","Praktik delivery selaras ISO")}</li>
                <li className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>{t("Certified cloud & security experts","Pakar cloud & keamanan tersertifikasi")}</li>
                <li className="flex gap-2"><svg className="mt-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>{t("Vendor‑neutral recommendations","Rekomendasi netral vendor")}</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold">{t("RFP & Partnerships", "RFP & Kemitraan")}</h3>
              <div className="mt-3 text-sm text-gray-700 space-y-3">
                <div>
                  <div className="font-medium">RFP / RFQ</div>
                  <div className="text-gray-600">hello@signalist.consulting</div>
                </div>
                <div>
                  <div className="font-medium">{t("Press & Media", "Pers & Media")}</div>
                  <div className="text-gray-600">press@signalist.consulting</div>
                </div>
                <div>
                  <div className="font-medium">{t("Offices", "Kantor")}</div>
                  <ul className="mt-2 space-y-2">
                    <li>Jakarta — {t("SCBD District", "Kawasan SCBD")}</li>
                    <li>Singapore — {t("Marina Bay Area", "Kawasan Marina Bay")}</li>
                    <li>Remote‑first — GMT+7 / GMT+8</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Let’s talk", "Ayo berdiskusi")}</h2>
              <p className="mt-2 text-sm text-gray-600">{t("Tell us about your challenge and goals. We’ll respond within 1 business day.", "Ceritakan tantangan dan tujuan Anda. Kami akan merespons dalam 1 hari kerja.")}</p>
              <form className="mt-6 grid sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium">{t("Name", "Nama")}</label>
                  <input name="name" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder={t("Your name", "Nama Anda")} />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium">Email</label>
                  <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="you@company.com" />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium">{t("Company", "Perusahaan")}</label>
                  <input name="company" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Acme, Inc." />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium">{t("Budget", "Anggaran")}</label>
                  <select name="budget" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                    <option>{t("Select", "Pilih")}</option>
                    <option>$10k – $25k</option>
                    <option>$25k – $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">{t("Project details", "Detail proyek")}</label>
                  <textarea name="details" required rows={4} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder={t("Tell us what you need...", "Ceritakan kebutuhan Anda...")}></textarea>
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500">{t("By submitting, you agree to our privacy policy.", "Dengan mengirimkan, Anda setuju pada kebijakan privasi.")}</div>
                  <button disabled={loading} className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-900 disabled:opacity-50">
                    {loading ? t("Sending...", "Mengirim...") : t("Send", "Kirim")}
                  </button>
                </div>
                {done && (
                  <div className={`sm:col-span-2 text-sm ${done.ok ? "text-green-700" : "text-red-700"}`}
>{done.msg}</div>
                )}
              </form>
            </div>
            <aside className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold">{t("Offices", "Kantor")}</h3>
              <ul className="mt-3 space-y-3 text-sm text-gray-700">
                <li><div className="font-medium">Jakarta</div><div className="text-gray-600">{t("SCBD District", "Kawasan SCBD")}</div></li>
                <li><div className="font-medium">Singapore</div><div className="text-gray-600">{t("Marina Bay Area", "Kawasan Marina Bay")}</div></li>
                <li><div className="font-medium">Remote‑first</div><div className="text-gray-600">GMT+7 / GMT+8</div></li>
              </ul>
              <div className="mt-6 text-sm">
                <div className="font-semibold">{t("RFP & partnerships", "RFP & kemitraan")}</div>
                <a href="mailto:hello@signalist.consulting" className="underline">hello@signalist.consulting</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
