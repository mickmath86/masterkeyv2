import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const apiKey = process.env.RENTCAST_API_KEY;

  if (!address) {
    return NextResponse.json({ found: false, error: "Address required" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ found: false, error: "API key not configured" });
  }

  try {
    const res = await fetch(
      `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          "X-Api-Key": apiKey,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ found: false });
    }

    const data = await res.json();
    const property = Array.isArray(data) ? data[0] : data?.properties?.[0];

    if (!property) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      bedrooms: property.bedrooms ?? null,
      bathrooms: property.bathrooms ?? null,
      sqft: property.squareFootage ?? null,
      yearBuilt: property.yearBuilt ?? null,
      propertyType: property.propertyType ?? "Single Family",
      formattedAddress: property.formattedAddress ?? address,
    });
  } catch (err) {
    console.error("Property lookup error:", err);
    return NextResponse.json({ found: false });
  }
}
