import type { Lang } from "@/lib/types";

export default function Approach({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const steps = [
    { t: t("Discover", "Discovery"), d: t("Value cases, risk, and constraints.", "Value case, risiko, dan batasan.") },
    { t: t("Design", "Desain"), d: t("Target architecture, experience, and plan.", "Arsitektur target, pengalaman, dan rencana.") },
    { t: t("Build", "Bangun"), d: t("Agile delivery with DevSecOps.", "Delivery agile dengan DevSecOps.") },
    { t: t("Run & Scale", "Operasi & Scale"), d: t("SRE, FinOps, and capability uplift.", "SRE, FinOps, dan peningkatan kapabilitas.") },
  ];
  return (
    <section id="approach" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Our approach", "Pendekatan kami")}</h2>
            <a href="#contact" className="text-sm underline underline-offset-4">{t("Align to your roadmap", "Selaraskan dengan roadmap Anda")}</a>
          </div>
          <ol className="mt-8 grid md:grid-cols-4 gap-6 list-decimal list-inside">
            {steps.map(({ t: title, d: desc }, i) => (
              <li key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-xs text-gray-500">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-semibold">{title}</div>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
