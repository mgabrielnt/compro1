import type { Lang } from "@/lib/types";

export default function Differentiators({ lang }: { lang: "EN" | "ID" }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const items = [
    { k: t("Outcome‑first", "Berorientasi Hasil"), v: t("Value tracked via OKR & financial KPIs.", "Nilai dilacak via OKR & KPI finansial.") },
    { k: t("Security by design", "Keamanan sejak desain"), v: t("DevSecOps, zero‑trust, privacy‑by‑default.", "DevSecOps, zero‑trust, privacy‑by‑default.") },
    { k: t("Industry‑led", "Berbasis Industri"), v: t("Templates & accelerators tailored to sectors.", "Template & akselerator sesuai sektor.") },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8">
            {items.map(({ k, v }) => (
              <div key={k}>
                <h3 className="text-base font-semibold">{k}</h3>
                <p className="mt-2 text-sm text-gray-600">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
