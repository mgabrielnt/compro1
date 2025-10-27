"use client";

import { useState } from "react";
import type { Lang } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/(section)/Hero";
import Services from "@/components/(section)/Services";
import Differentiators from "@/components/(section)/Differentiators";
import CaseStudies from "@/components/(section)/CaseStudies";
import Industries from "@/components/(section)/Industries";
import Approach from "@/components/(section)/Approach";
import Alliances from "@/components/(section)/Alliances";
import Governance from "@/components/(section)/Governance";
import Insights from "@/components/(section)/Insights";
import AboutContact from "@/components/(section)/AboutContact";

export default function Page() {
  const [lang, setLang] = useState<Lang>("EN");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar lang={lang} setLang={setLang} open={open} setOpen={setOpen} />
      <main id="content">
        <Hero lang={lang} />
        <Services lang={lang} />
        <Differentiators lang={lang} />
        <CaseStudies lang={lang} />
        <Industries lang={lang} />
        <Approach lang={lang} />
        <Alliances lang={lang} />
        <Governance lang={lang} />
        <Insights lang={lang} />
        <AboutContact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
