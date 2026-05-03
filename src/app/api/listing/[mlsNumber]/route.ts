import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;
const REPLIERS_BASE_URL = "https://api.repliers.io";

type RouteContext = {
    params: Promise<{ mlsNumber: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
    const { mlsNumber } = await context.params;

    if (!mlsNumber) {
        return NextResponse.json({ error: "MLS number required" }, { status: 400 });
    }

    const url = `${REPLIERS_BASE_URL}/listings/${mlsNumber}`;

    try {
        const response = await fetch(url, {
            headers: {
                "REPLIERS-API-KEY": REPLIERS_API_KEY || "",
                "Content-Type": "application/json",
            },
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Listing not found", status: response.status },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Listing fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
