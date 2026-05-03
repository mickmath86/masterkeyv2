"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/hXpL9N13md8EpjjO5z0l/webhook-trigger/e5c3377b-b8fa-4ac1-ba21-bd2d63560dd7";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const masked = local.slice(0, 2) + "****";
  return `${masked}@${domain}`;
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === "1") {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const name = searchParams.get("name") || "";
  const d = searchParams.get("d") || "";

  const [showResend, setShowResend] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [resending, setResending] = useState(false);
  const [resendDone, setResendDone] = useState(false);
  const [resendError, setResendError] = useState("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.usemasterkey.com";
  const reportUrl = `${siteUrl}/rent-vs-sell/results?id=${reportId}`;

  async function handleResend() {
    if (!newEmail && !newPhone) {
      setResendError("Please enter a new email or phone number.");
      return;
    }

    setResending(true);
    setResendError("");

    // Decode original webhook payload
    let original: Record<string, unknown> = {};
    try {
      original = JSON.parse(atob(d));
    } catch {
      // ignore
    }

    const payload = {
      firstName: name,
      email: newEmail || email,
      phone: (newPhone || phone).replace(/\D/g, ""),
      reportUrl,
      formType: "rent-vs-sell-resend",
      resentAt: new Date().toISOString(),
      originalEmail: email,
      originalPhone: phone.replace(/\D/g, ""),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setResendDone(true);
    } catch {
      setResendError("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    fontSize: 16,
    border: "1.5px solid #d1d5db",
    borderRadius: 10,
    outline: "none",
    background: "#fff",
    color: "#111827",
    fontFamily: "inherit",
    marginBottom: 12,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "48px 40px",
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: 72,
            height: 72,
            background: "#f0fdf4",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#16a34a" />
            <path d="M7 12l3.5 3.5L17 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
            fontWeight: 800,
            color: "#111827",
            marginBottom: 8,
          }}
        >
          Your report is on its way{name ? `, ${name}` : ""}!
        </h1>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
          We&apos;re sending your personalized Sell vs. Rent analysis to:
        </p>

        {/* Contact info card */}
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 32,
            textAlign: "left",
          }}
        >
          {email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: phone ? 14 : 0,
              }}
            >
              <span style={{ fontSize: 18 }}>✉️</span>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>EMAIL</div>
                <div style={{ fontSize: 15, color: "#111827", fontWeight: 600 }}>{maskEmail(email)}</div>
              </div>
            </div>
          )}
          {phone && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>📱</span>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>TEXT MESSAGE</div>
                <div style={{ fontSize: 15, color: "#111827", fontWeight: 600 }}>{formatPhone(phone)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Resend link */}
        {!resendDone ? (
          <>
            <button
              onClick={() => setShowResend((s) => !s)}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "underline",
                marginBottom: showResend ? 20 : 0,
                fontWeight: 500,
              }}
            >
              Didn&apos;t get it? Update your contact info and resend
            </button>

            {showResend && (
              <div style={{ textAlign: "left", marginTop: 8 }}>
                <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: 14 }}>
                  New Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={email ? maskEmail(email) : "your@email.com"}
                  style={inputStyle}
                />
                <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: 14 }}>
                  New Phone Number
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder={phone ? formatPhone(phone) : "(805) 555-0100"}
                  style={inputStyle}
                />
                {resendError && (
                  <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 10 }}>{resendError}</p>
                )}
                <button
                  onClick={handleResend}
                  disabled={resending}
                  style={{
                    width: "100%",
                    background: resending ? "#93c5fd" : "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "13px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {resending ? "Resending…" : "Resend My Report"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: "14px 20px",
              color: "#166534",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ✓ Report resent successfully!
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
          <Link
            href="/rent-vs-sell"
            style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}
          >
            ← Back to Rent vs. Sell
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>}>
      <ConfirmationInner />
    </Suspense>
  );
}
