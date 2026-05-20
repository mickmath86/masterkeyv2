import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not configured");
    return createClient(url, key);
}

// GET /api/saved-properties/check?mlsNumber=xxx
export async function GET(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ saved: false });
    }

    const { searchParams } = new URL(req.url);
    const mlsNumber = searchParams.get("mlsNumber");

    if (!mlsNumber) {
        return NextResponse.json({ saved: false });
    }

    try {
        const supabase = getSupabase();
        const { data } = await supabase
            .from("saved_properties")
            .select("id")
            .eq("user_id", userId)
            .eq("mls_number", mlsNumber)
            .single();

        return NextResponse.json({ saved: !!data });
    } catch {
        return NextResponse.json({ saved: false });
    }
}
