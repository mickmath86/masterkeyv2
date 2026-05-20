import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/header/Header";
import Footer1 from "@/components/footer/Footer1";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import RemoveButtonClient from "./RemoveButtonClient";

export const metadata: Metadata = {
    title: "Saved Properties | MasterKey Real Estate",
};

function getSupabase() {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

function fmt(n: number | null) {
    if (!n) return "—";
    return n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
}

type SavedProperty = {
    id: string;
    mls_number: string;
    address: string;
    city: string | null;
    price: number | null;
    beds: number | null;
    baths: number | null;
    sqft: number | null;
    image_url: string | null;
    saved_at: string;
};

export default async function SavedPropertiesPage() {
    const { userId } = await auth();
    if (!userId) redirect("/login");

    const supabase = getSupabase();
    const { data } = await supabase
        .from("saved_properties")
        .select("*")
        .eq("user_id", userId)
        .order("saved_at", { ascending: false });

    const properties: SavedProperty[] = (data as SavedProperty[]) ?? [];

    return (
        <>
            <Header />
            <main
                style={{
                    paddingTop: 100,
                    paddingBottom: 80,
                    minHeight: "80vh",
                    background: "#f9fafb",
                }}
            >
                <div className="tf-container" style={{ maxWidth: 900 }}>
                    {/* Page header */}
                    <div style={{ marginBottom: 36 }}>
                        <h2 style={{ fontWeight: 800, color: "#111827", marginBottom: 6 }}>
                            Saved Properties
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: 15 }}>
                            {properties.length === 0
                                ? "You haven't saved any properties yet."
                                : `${properties.length} saved propert${properties.length === 1 ? "y" : "ies"}`}
                        </p>
                    </div>

                    {/* Empty state */}
                    {properties.length === 0 && (
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 16,
                                padding: "64px 40px",
                                textAlign: "center",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
                            <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 10 }}>
                                No saved properties yet
                            </h3>
                            <p style={{ color: "#6b7280", marginBottom: 28, fontSize: 15 }}>
                                Browse listings and click the heart icon to save properties here.
                            </p>
                            <Link
                                href="/listing-half-map-grid"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "#111827",
                                    color: "#fff",
                                    borderRadius: 10,
                                    padding: "13px 28px",
                                    fontWeight: 700,
                                    fontSize: 15,
                                    textDecoration: "none",
                                }}
                            >
                                Browse Properties →
                            </Link>
                        </div>
                    )}

                    {/* Property list */}
                    {properties.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {properties.map((p) => (
                                <div
                                    key={p.id}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 14,
                                        border: "1px solid #e5e7eb",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "stretch",
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <Link
                                        href={`/property-details-1/${p.mls_number}`}
                                        style={{
                                            display: "block",
                                            flexShrink: 0,
                                            width: 200,
                                            position: "relative",
                                            minHeight: 140,
                                        }}
                                    >
                                        {p.image_url ? (
                                            <Image
                                                src={
                                                    p.image_url.includes("cdn.repliers.io") &&
                                                    !p.image_url.includes("?class=")
                                                        ? `${p.image_url}?class=large`
                                                        : p.image_url
                                                }
                                                alt={p.address}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                unoptimized
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    background: "#f3f4f6",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 32,
                                                }}
                                            >
                                                🏠
                                            </div>
                                        )}
                                    </Link>

                                    {/* Info */}
                                    <div
                                        style={{
                                            flex: 1,
                                            padding: "20px 24px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: 800,
                                                    fontSize: 20,
                                                    color: "#111827",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {fmt(p.price)}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: "#374151",
                                                    marginBottom: 12,
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {p.address}
                                                {p.city ? `, ${p.city}` : ""}
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 20,
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {p.beds != null && (
                                                    <span>
                                                        🛏 {p.beds} bed{p.beds !== 1 ? "s" : ""}
                                                    </span>
                                                )}
                                                {p.baths != null && (
                                                    <span>
                                                        🚿 {p.baths} bath{p.baths !== 1 ? "s" : ""}
                                                    </span>
                                                )}
                                                {p.sqft != null && (
                                                    <span>📐 {p.sqft.toLocaleString()} sqft</span>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: 16,
                                                paddingTop: 16,
                                                borderTop: "1px solid #f3f4f6",
                                            }}
                                        >
                                            <Link
                                                href={`/property-details-1/${p.mls_number}`}
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    color: "#111827",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                View Listing →
                                            </Link>
                                            <RemoveButtonClient mlsNumber={p.mls_number} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer1 />
        </>
    );
}
