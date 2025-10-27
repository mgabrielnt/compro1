import type { Lang } from "@/lib/types";

export default function Alliances({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  const vendors = ["Microsoft Azure", "AWS", "Google Cloud", "SAP", "Salesforce", "Oracle", "ServiceNow"];
  return (
    <section id="alliances" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold">{t("Alliances & Certifications", "Aliansi & Sertifikasi")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {vendors.map((v) => (
                <li key={v} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-black"/> {v}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold">{t("Delivery Model", "Model Delivery")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>Onsite / Near‑shore / Offshore</li>
              <li>{t("Agile + ITIL aligned run", "Operasi selaras Agile + ITIL")}</li>
              <li>SLA / SLO {t("governed", "dengan tata kelola")}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold">{t("Proof Points", "Bukti Dampak")}</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
              {[
                { n: "98%", d: t("on‑time", "tepat waktu") },
                { n: "120+", d: t("experts", "pakar") },
                { n: "14", d: t("industries", "industri") },
              ].map(({ n, d }) => (
                <div key={n} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="text-2xl font-semibold">{n}</div>
                  <div className="text-xs text-gray-600 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
