export default function InsightsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Insights</h1>
      <ul className="mt-6 list-disc list-inside space-y-2">
        <li><a className="underline" href="/insights/responsible-ai">Responsible AI in regulated industries</a></li>
        <li><a className="underline" href="/insights/platform-engineering">Platform Engineering (IDP) that lasts</a></li>
        <li><a className="underline" href="/insights/finops">FinOps: cost visibility to decisions</a></li>
      </ul>
    </div>
  );
}
