import type { Lang } from "@/lib/types";

export default function Footer({ lang }: { lang: Lang }) {
  const t = (en: string, id: string) => (lang === "EN" ? en : id);
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-black" aria-hidden />
            <span className="font-semibold tracking-tight">Signalist Consulting</span>
          </div>
          <p className="mt-3 text-gray-600 max-w-xs">
            {t("Enterprise IT consulting for cloud, data & AI, and product engineering.","Konsultan IT enterprise untuk cloud, data & AI, dan rekayasa produk.")}
          </p>
        </div>
        <div>
          <div className="font-semibold">{t("Services", "Layanan")}</div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>{t("Strategy & Transformation", "Strategi & Transformasi")}</li>
            <li>{t("Cloud & Platform", "Cloud & Platform")}</li>
            <li>{t("Data & AI", "Data & AI")}</li>
            <li>{t("Cybersecurity", "Keamanan Siber")}</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">{t("Company", "Perusahaan")}</div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><a href="#about" className="hover:underline">{t("About", "Tentang")}</a></li>
            <li><a href="#insights" className="hover:underline">{t("Insights", "Wawasan")}</a></li>
            <li><a href="#governance" className="hover:underline">{t("Governance", "Tata Kelola")}</a></li>
            <li><a href="#contact" className="hover:underline">{t("Contact", "Kontak")}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">{t("Legal", "Legal")}</div>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>{t("Privacy Policy", "Kebijakan Privasi")}</li>
            <li>{t("Terms of Service", "Syarat Layanan")}</li>
            <li>© {new Date().getFullYear()} Signalist</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
