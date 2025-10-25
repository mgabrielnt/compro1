import { NextResponse } from "next/server";
import { z } from "zod";
import { createNotion, postWebhook, sendEmail } from "@/lib/contact";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  details: z.string().min(5),
  meta: z.record(z.any()).optional(),
});

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400, headers: corsHeaders() });
    }

    const payload = parsed.data;

    const results = await Promise.allSettled([
      sendEmail(payload),
      createNotion(payload),
      postWebhook(payload),
    ]);

    const summary = results.map((r) => (r.status === "fulfilled" ? r.value : { ok: false, error: String(r.reason) }));
    const anyOk = summary.some((s: any) => s.ok);
    const status = anyOk ? 200 : 500;

    return NextResponse.json({ ok: anyOk, sinks: summary }, { status, headers: corsHeaders() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500, headers: corsHeaders() });
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
