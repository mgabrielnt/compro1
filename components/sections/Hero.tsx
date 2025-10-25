import type { Lang } from "@/lib/types";

export default function Hero({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(0,0,0,0.08),rgba(0,0,0,0)_60%)]" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-black"/> {t("Enterprise‑grade IT Consulting","Konsultan IT Kelas Enterprise")}
            </div>
            <h1 className="text-3xl sm:text-5xl/tight font-semibold tracking-tight">
              {t("We design, modernize, and scale mission‑critical platforms.","Kami merancang, memodernisasi, dan menskalakan platform kritikal.")}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl">
              {t("Strategy to execution across Cloud, Data & AI, Enterprise Engineering, Cybersecurity, and Experience Design.","Dari strategi hingga eksekusi pada Cloud, Data & AI, Rekayasa Enterprise, Keamanan Siber, dan Desain Pengalaman.")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center rounded-full bg-black text-white px-5 py-3 text-sm font-medium hover:bg-gray-900">
                {t("Start a project","Mulai proyek")}
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="#cases" className="inline-flex items-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-100">
                {t("See case studies","Lihat studi kasus")}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 sm:flex sm:flex-wrap gap-6 sm:gap-10 items-center opacity-70">
              {["Azure Partner","AWS Partner","Google Cloud","SAP","Salesforce","Oracle","ServiceNow"].map((v) => (
                <div key={v} className="text-xs whitespace-nowrap">{v}</div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl border border-gray-200 bg-white shadow-sm p-4 grid place-items-center">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">{t("Executive view mockup","Mockup tampilan eksekutif")}</div>
                <div className="mx-auto h-28 w-44 rounded-xl bg-gray-100 border border-gray-200"/>
                <p className="mt-3 text-sm text-gray-600 max-w-xs mx-auto">{t("Replace with montage of platforms, dashboards, and design systems.","Ganti dengan montase platform, dashboard, dan design system.")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
