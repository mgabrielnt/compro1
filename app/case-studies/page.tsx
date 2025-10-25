export default function CaseStudiesIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Case Studies</h1>
      <ul className="mt-6 list-disc list-inside space-y-2">
        <li><a className="underline" href="/case-studies/fs-kyc">FSI — KYC Onboarding (‑42% time‑to‑KYC)</a></li>
        <li><a className="underline" href="/case-studies/telco-aiops">Telco — AIOps & MTTR (‑37%)</a></li>
        <li><a className="underline" href="/case-studies/public-id">Public — National ID (50M+/mo)</a></li>
      </ul>
    </div>
  );
}
