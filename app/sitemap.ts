export default function sitemap() {
  const base = "https://example.com";
  const paths = [
    "/", "/language", "/insights", "/insights/responsible-ai", "/insights/platform-engineering", "/insights/finops",
    "/case-studies", "/case-studies/fs-kyc", "/case-studies/telco-aiops", "/case-studies/public-id",
    "/privacy", "/terms"
  ];

  return paths.map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
}
