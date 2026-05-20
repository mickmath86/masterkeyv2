"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveButtonClient({ mlsNumber }: { mlsNumber: string }) {
    const router = useRouter();
    const [removing, setRemoving] = useState(false);

    async function handleRemove() {
        setRemoving(true);
        try {
            await fetch(`/api/saved-properties?mlsNumber=${mlsNumber}`, {
                method: "DELETE",
            });
            router.refresh();
        } catch {
            // no-op
        } finally {
            setRemoving(false);
        }
    }

    return (
        <button
            onClick={handleRemove}
            disabled={removing}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                color: removing ? "#9ca3af" : "#dc2626",
                background: "none",
                border: "none",
                cursor: removing ? "wait" : "pointer",
                padding: 0,
            }}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
            </svg>
            {removing ? "Removing…" : "Remove"}
        </button>
    );
}
