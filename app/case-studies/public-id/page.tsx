export default function Page(){
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <a href="/case-studies" className="text-sm underline underline-offset-4">← Back</a>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Public Sector — National ID Services</h1>
      <p className="mt-2 text-gray-600">Highlights:</p>
      <ul className="mt-3 list-disc list-inside space-y-1">
        <li>Rate limit & throttling</li><li>Hardware‑backed keys</li><li>Geo‑redundant failover</li>
      </ul>
    </div>
  );
}
