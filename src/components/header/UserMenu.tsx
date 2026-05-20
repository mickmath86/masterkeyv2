"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserMenu() {
    const { isSignedIn, isLoaded, user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return (
            <Link href="/login" className="link text-button text_primary-color">
                Login / Register
            </Link>
        );
    }

    const initials =
        [user.firstName?.[0], user.lastName?.[0]]
            .filter(Boolean)
            .join("")
            .toUpperCase() ||
        user.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase() ||
        "U";

    const avatarBorderStyle: React.CSSProperties = {
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: open ? "2px solid #111827" : "2px solid #e5e7eb",
        background: "none",
        cursor: "pointer",
        padding: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.15s",
    };

    return (
        <div ref={ref} style={{ position: "relative" }}>
            {/* Avatar trigger */}
            <button onClick={() => setOpen((o) => !o)} aria-label="Account menu" style={avatarBorderStyle}>
                {user.imageUrl ? (
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName || "User"}
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        unoptimized
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "#111827",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {initials}
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 10px)",
                        right: 0,
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 14,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        minWidth: 220,
                        zIndex: 9999,
                        overflow: "hidden",
                    }}
                >
                    {/* User info */}
                    <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #f3f4f6" }}>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: 15, marginBottom: 2 }}>
                            {user.firstName
                                ? `${user.firstName} ${user.lastName || ""}`.trim()
                                : "My Account"}
                        </div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>
                            {user.emailAddresses[0]?.emailAddress}
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{ padding: "8px 0" }}>
                        <Link
                            href="/saved-properties"
                            onClick={() => setOpen(false)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "10px 18px",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#374151",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                            Saved Properties
                        </Link>
                    </div>

                    {/* Sign out */}
                    <div style={{ padding: "8px 0", borderTop: "1px solid #f3f4f6" }}>
                        <button
                            onClick={() => { setOpen(false); signOut({ redirectUrl: "/" }); }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "10px 18px",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#6b7280",
                                background: "none",
                                border: "none",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
