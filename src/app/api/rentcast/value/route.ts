import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = process.env.RENTCAST_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const params = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    params.set(key, value);
  }
  params.set("compCount", "5");

  try {
    const res = await fetch(
      `https://api.rentcast.io/v1/avm/value?${params.toString()}`,
      {
        headers: {
          "X-Api-Key": apiKey,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Rentcast value error:", err);
    return NextResponse.json({ error: "Failed to fetch value" }, { status: 500 });
  }
}
