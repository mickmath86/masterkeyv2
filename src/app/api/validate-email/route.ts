import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ valid: false, error: "Please enter a valid email address." });
  }

  if (!apiKey) {
    return NextResponse.json({ valid: true });
  }

  try {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();

    const isValid =
      data.deliverability === "DELIVERABLE" &&
      data.is_valid_format?.value === true &&
      data.is_disposable_email?.value === false;

    if (!isValid) {
      return NextResponse.json({
        valid: false,
        error: "Please enter a valid, non-disposable email address.",
      });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: true });
  }
}
