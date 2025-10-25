import type { Lang } from "@/lib/types";

export default function Insights({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  return (
    <section id="insights" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Insights", "Wawasan")}</h2>
          <a href="#" className="text-sm underline underline-offset-4">{t("View all", "Lihat semua")}</a>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <article key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="text-xs uppercase tracking-wide text-gray-500">{t("Thought Leadership", "Thought Leadership")}</div>
              <h3 className="mt-1 font-semibold">{t("Responsible AI in regulated industries", "AI bertanggung jawab di industri teregulasi")}</h3>
              <p className="mt-2 text-sm text-gray-600">{t("Governance patterns for safe GenAI deployment.", "Pola tata kelola untuk penerapan GenAI yang aman.")}</p>
              <div className="mt-3 text-sm underline underline-offset-4">{t("Read", "Baca")}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
