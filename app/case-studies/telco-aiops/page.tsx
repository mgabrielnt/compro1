export default function Page(){
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <a href="/case-studies" className="text-sm underline underline-offset-4">← Back</a>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Telecommunications — AIOps & MTTR</h1>
      <p className="mt-2 text-gray-600">Highlights:</p>
      <ul className="mt-3 list-disc list-inside space-y-1">
        <li>Federated logs/metrics/traces</li><li>Noise reduction via ML</li><li>Runbook automation</li>
      </ul>
    </div>
  );
}
