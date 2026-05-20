"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import type { ListingDetail } from "@/types/listing";

interface SaveButtonProps {
    listing: ListingDetail;
}

export default function SaveButton({ listing }: SaveButtonProps) {
    const { isSignedIn, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    // Check if already saved on mount
    useEffect(() => {
        if (!isLoaded || !isSignedIn) {
            setChecked(true);
            return;
        }
        fetch(`/api/saved-properties/check?mlsNumber=${listing.id}`)
            .then((r) => r.json())
            .then((d) => {
                setSaved(d.saved ?? false);
                setChecked(true);
            })
            .catch(() => setChecked(true));
    }, [isLoaded, isSignedIn, listing.id]);

    async function handleClick() {
        // Not logged in — open Clerk sign-in modal
        if (!isSignedIn) {
            openSignIn({ forceRedirectUrl: window.location.href });
            return;
        }

        setLoading(true);
        try {
            if (saved) {
                // Unsave
                await fetch(
                    `/api/saved-properties?mlsNumber=${listing.id}`,
                    { method: "DELETE" }
                );
                setSaved(false);
            } else {
                // Save — pull first image URL from the listing
                const imageUrl =
                    listing.images && listing.images.length > 0
                        ? listing.images[0]
                        : null;

                await fetch("/api/saved-properties", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mlsNumber: listing.id,
                        address: listing.title,
                        city: listing.address?.split(",")[1]?.trim() ?? null,
                        price: listing.price,
                        beds: listing.beds,
                        baths: listing.baths,
                        sqft: listing.sqft,
                        imageUrl,
                    }),
                });
                setSaved(true);
            }
        } catch (err) {
            console.error("Save error:", err);
        } finally {
            setLoading(false);
        }
    }

    if (!checked) return (
        <a href="#" aria-label="Save" style={{ opacity: 0.4, pointerEvents: "none" }}>
            <span className="icon icon-Heart"></span>
        </a>
    );

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            aria-label={saved ? "Remove from saved" : "Save property"}
            style={{
                background: "none",
                border: "none",
                cursor: loading ? "wait" : "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                transition: "transform 0.15s",
                transform: loading ? "scale(0.9)" : "scale(1)",
            }}
        >
            {saved ? (
                /* Filled heart — saved */
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="#e11d48"
                    aria-hidden="true"
                >
                    <path d="M12 21.593c-.425-.396-8.995-8.044-8.995-12.218C3.005 5.946 5.52 3.5 8.625 3.5c1.812 0 3.423.916 4.375 2.321C13.952 4.416 15.563 3.5 17.375 3.5c3.105 0 5.62 2.446 5.62 5.875 0 4.174-8.57 11.822-8.995 12.218z" />
                </svg>
            ) : (
                /* Outline heart — unsaved */
                <span
                    className="icon icon-Heart"
                    style={{ fontSize: 22, color: "inherit" }}
                />
            )}
        </button>
    );
}
