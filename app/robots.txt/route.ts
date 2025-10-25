import { NextResponse } from "next/server";

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml`;
  return new NextResponse(body, { headers: { "Content-Type": "text/plain" } });
}
