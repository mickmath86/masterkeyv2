import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/hXpL9N13md8EpjjO5z0l/webhook-trigger/e5c3377b-b8fa-4ac1-ba21-bd2d63560dd7";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.usemasterkey.com";
  const reportUrl = `${siteUrl}/rent-vs-sell/results?id=${id}`;

  // Fire webhook non-blocking
  const payload = {
    reportId: id,
    reportUrl,
    formType: "rent-vs-sell-link-clicked",
    clickedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "",
    referrer: req.headers.get("referer") || "",
    source: "sms-redirect",
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  return NextResponse.redirect(reportUrl, 302);
}
