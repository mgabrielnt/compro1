import type { Lang } from "@/lib/types";

export default function Governance({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const items = [
    { k: t("PMO & SteerCo", "PMO & SteerCo"), v: t("Milestone reviews, RAID, value tracking.", "Review milestone, RAID, pelacakan nilai.") },
    { k: t("Risk & Security", "Risiko & Keamanan"), v: t("Threat modeling, zero‑trust, posture.", "Threat modeling, zero‑trust, posture.") },
    { k: t("Quality & Testing", "Kualitas & Testing"), v: t("Shift‑left QA, automation, perf.", "QA shift‑left, automasi, performa.") },
    { k: t("Compliance & Privacy", "Kepatuhan & Privasi"), v: t("ISO/SOC/PCI, DPIA, data governance.", "ISO/SOC/PCI, DPIA, tata kelola data.") },
  ];
  return (
    <section id="governance" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("Delivery governance", "Tata kelola delivery")}</h2>
            <a href="#contact" className="text-sm underline underline-offset-4">{t("Request our PMO playbook", "Minta PMO playbook")}</a>
          </div>
          <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 gap-6 text-sm">
            {items.map(({ k, v }) => (
              <div key={k} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="font-medium">{k}</div>
                <div className="mt-1 text-gray-600">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
