import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;

  if (!phone) {
    return NextResponse.json({ valid: false, error: "Phone is required" }, { status: 400 });
  }

  // Strip non-digits
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    return NextResponse.json({ valid: false, error: "Please enter a valid 10-digit phone number." });
  }

  if (!apiKey) {
    // In dev, skip validation
    return NextResponse.json({ valid: true });
  }

  try {
    const res = await fetch(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${digits}`
    );
    const data = await res.json();

    if (!data.valid) {
      return NextResponse.json({ valid: false, error: "Please enter a valid phone number." });
    }

    return NextResponse.json({ valid: true });
  } catch {
    // On API error, allow through
    return NextResponse.json({ valid: true });
  }
}
