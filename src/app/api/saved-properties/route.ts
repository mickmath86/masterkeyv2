import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not configured");
    return createClient(url, key);
}

// GET /api/saved-properties — list all saved for the current user
export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("saved_properties")
            .select("*")
            .eq("user_id", userId)
            .order("saved_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json({ properties: data });
    } catch (err) {
        console.error("GET saved-properties error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// POST /api/saved-properties — save a property
export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { mlsNumber, address, city, price, beds, baths, sqft, imageUrl } = body;

        if (!mlsNumber || !address) {
            return NextResponse.json(
                { error: "mlsNumber and address are required" },
                { status: 400 }
            );
        }

        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("saved_properties")
            .upsert(
                {
                    user_id: userId,
                    mls_number: mlsNumber,
                    address,
                    city: city ?? null,
                    price: price ?? null,
                    beds: beds ?? null,
                    baths: baths ?? null,
                    sqft: sqft ?? null,
                    image_url: imageUrl ?? null,
                },
                { onConflict: "user_id,mls_number" }
            )
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ property: data });
    } catch (err) {
        console.error("POST saved-properties error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// DELETE /api/saved-properties?mlsNumber=xxx — unsave a property
export async function DELETE(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mlsNumber = searchParams.get("mlsNumber");

    if (!mlsNumber) {
        return NextResponse.json({ error: "mlsNumber required" }, { status: 400 });
    }

    try {
        const supabase = getSupabase();
        const { error } = await supabase
            .from("saved_properties")
            .delete()
            .eq("user_id", userId)
            .eq("mls_number", mlsNumber);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE saved-properties error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// GET /api/saved-properties/check?mlsNumber=xxx — is this property saved?
// (handled in the [check] route for cleanliness — see below)
