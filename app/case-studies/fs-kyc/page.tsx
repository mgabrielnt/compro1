export default function Page(){
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <a href="/case-studies" className="text-sm underline underline-offset-4">← Back</a>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Financial Services — Cloud‑native Onboarding</h1>
      <p className="mt-2 text-gray-600">Highlights:</p>
      <ul className="mt-3 list-disc list-inside space-y-1">
        <li>KYC micro‑journeys</li><li>Zero‑trust APIs & consent ledger</li><li>Observability & SRE SLIs</li>
      </ul>
    </div>
  );
}
