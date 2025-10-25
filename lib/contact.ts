import nodemailer from "nodemailer";
import { Client as NotionClient } from "@notionhq/client";

export type ContactPayload = {
  name?: string;
  email: string;
  company?: string;
  budget?: string;
  details: string;
  meta?: Record<string, unknown>;
};

export async function sendEmail(p: ContactPayload) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) return { ok: false, skipped: true, reason: "SMTP env missing" };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const from = process.env.CONTACT_FROM || process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO!;

  const subject = `New contact request — ${p.name || p.email}`;
  const text = [
    `Name: ${p.name || "-"}`,
    `Email: ${p.email}`,
    `Company: ${p.company || "-"}`,
    `Budget: ${p.budget || "-"}`,
    `Details: ${p.details}`,
  ].join("\n");

  const html = `
    <h2>New contact request</h2>
    <p><b>Name:</b> ${p.name || "-"}</p>
    <p><b>Email:</b> ${p.email}</p>
    <p><b>Company:</b> ${p.company || "-"}</p>
    <p><b>Budget:</b> ${p.budget || "-"}</p>
    <p><b>Details:</b><br/>${(p.details || "").replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({ from, to, subject, text, html });
  return { ok: true } as const;
}

export async function createNotion(p: ContactPayload) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) return { ok: false, skipped: true, reason: "Notion env missing" };
  const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: p.name || p.email } }] },
      Email: { email: p.email },
      Company: { rich_text: [{ text: { content: p.company || "-" } }] },
      Budget: { rich_text: [{ text: { content: p.budget || "-" } }] },
      Created: { date: { start: new Date().toISOString() } },
    },
    children: [
      { object: "block", type: "paragraph", paragraph: { rich_text: [{ text: { content: p.details } }] } },
    ],
  });
  return { ok: true } as const;
}

export async function postWebhook(p: ContactPayload) {
  if (!process.env.WEBHOOK_URL) return { ok: false, skipped: true, reason: "Webhook URL missing" };
  const res = await fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "it-consulting-site", type: "contact", payload: p }),
  });
  if (!res.ok) throw new Error(`Webhook HTTP ${res.status}`);
  return { ok: true } as const;
}
