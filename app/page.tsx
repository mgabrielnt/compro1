"use client";

import { useState } from "react";
import type { Lang } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Differentiators from "@/sections/Differentiators";
import CaseStudies from "@/sections/CaseStudies";
import Industries from "@/sections/Industries";
import Approach from "@/sections/Approach";
import Alliances from "@/sections/Alliances";
import Governance from "@/sections/Governance";
import Insights from "@/sections/Insights";
import AboutContact from "@/sections/AboutContact";

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
