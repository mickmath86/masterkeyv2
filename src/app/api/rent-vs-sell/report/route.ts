import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars not configured");
  return createClient(url, key);
}

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    const id = generateId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.usemasterkey.com";

    const { error } = await supabase.from("rvs_reports").insert({
      id,
      data: body,
      expires_at: expiresAt,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }

    return NextResponse.json({
      id,
      url: `${siteUrl}/rent-vs-sell/results?id=${id}`,
      expiresAt,
    });
  } catch (err) {
    console.error("Report POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("rvs_reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Check expiration
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: "Report expired" }, { status: 410 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Report GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
