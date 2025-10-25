import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signalist Consulting — IT Consulting for Cloud, Data & AI",
  description: "Enterprise IT consulting for cloud, data & AI, cybersecurity, and product engineering. Outcome-first, security-by-design.",
  openGraph: {
    title: "Signalist Consulting",
    description: "Enterprise IT consulting for cloud, data & AI, cybersecurity, and product engineering.",
    type: "website",
    url: "https://example.com",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
