"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculate, RVSFormData } from "@/lib/rvs-calculate";
import { Suspense } from "react";

// ── Types ──────────────────────────────────────────────────────────────
interface FormState {
  address: string;
  homeValue: string;
  purchasePrice: string;
  purchaseYear: string;
  mortgageBalance: string;
  interestRate: string;
  titleOwnership: "single" | "multiple" | "";
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  // Rentcast
  beds: string;
  baths: string;
  sqft: string;
  yearBuilt: string;
  propertyType: string;
  rentcastValue: number | null;
  rentcastValueLow: number | null;
  rentcastValueHigh: number | null;
  rentcastRent: number | null;
  monthlyRentConfirmed: string;
  estimatedValueConfirmed: string;
}

const INITIAL: FormState = {
  address: "",
  homeValue: "",
  purchasePrice: "",
  purchaseYear: "",
  mortgageBalance: "",
  interestRate: "",
  titleOwnership: "",
  phone: "",
  email: "",
  firstName: "",
  lastName: "",
  beds: "",
  baths: "",
  sqft: "",
  yearBuilt: "",
  propertyType: "",
  rentcastValue: null,
  rentcastValueLow: null,
  rentcastValueHigh: null,
  rentcastRent: null,
  monthlyRentConfirmed: "",
  estimatedValueConfirmed: "",
};

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/hXpL9N13md8EpjjO5z0l/webhook-trigger/e5c3377b-b8fa-4ac1-ba21-bd2d63560dd7";

// ── Helpers ────────────────────────────────────────────────────────────
function fmt(n: number | string | null | undefined): string {
  const num = typeof n === "string" ? parseFloat(n.replace(/,/g, "")) : n;
  if (num == null || isNaN(num as number)) return "";
  return Math.round(num as number).toLocaleString();
}

function parseDollar(s: string): number {
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

function formatDollarInput(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return parseInt(digits, 10).toLocaleString();
}

function resetZoom() {
  const meta = document.querySelector("meta[name=viewport]");
  if (meta) {
    meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
    setTimeout(() => {
      meta.setAttribute("content", "width=device-width, initial-scale=1");
    }, 300);
  }
}

// ── Quiz inner ─────────────────────────────────────────────────────────
function QuizInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledAddress = searchParams.get("address");

  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    address: prefilledAddress || "",
  });
  const [step, setStep] = useState(prefilledAddress ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [rentcastLoading, setRentcastLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showRefinement, setShowRefinement] = useState(false);

  const TOTAL_STEPS = prefilledAddress ? 6 : 7;
  // displayStep is 1-indexed for progress bar
  const displayStep = prefilledAddress ? step : step + 1;

  // Auto-fetch Rentcast when on step 1
  useEffect(() => {
    if (step === 1 && form.address) {
      fetchRentcast(form.address, form.beds, form.baths, form.sqft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function fetchRentcast(
    address: string,
    beds: string,
    baths: string,
    sqft: string
  ) {
    setRentcastLoading(true);
    try {
      const lookupRes = await fetch(
        `/api/homevalue/property-lookup?address=${encodeURIComponent(address)}`
      );
      const lookup = await lookupRes.json();

      const resolvedBeds = beds || (lookup.found ? lookup.bedrooms?.toString() : "4");
      const resolvedBaths = baths || (lookup.found ? lookup.bathrooms?.toString() : "2");
      const resolvedSqft = sqft || (lookup.found ? lookup.sqft?.toString() : "2000");
      const resolvedType = lookup.found ? lookup.propertyType : "Single Family";
      const resolvedYearBuilt = lookup.found ? lookup.yearBuilt?.toString() : "";

      setForm((f) => ({
        ...f,
        beds: resolvedBeds || "",
        baths: resolvedBaths || "",
        sqft: resolvedSqft || "",
        yearBuilt: resolvedYearBuilt || "",
        propertyType: resolvedType || "",
      }));

      const params = new URLSearchParams({
        address,
        propertyType: resolvedType || "Single Family",
        bedrooms: resolvedBeds || "4",
        bathrooms: resolvedBaths || "2",
        squareFootage: resolvedSqft || "2000",
      });

      const [valueRes, rentRes] = await Promise.all([
        fetch(`/api/rentcast/value?${params}`),
        fetch(`/api/rentcast/rent?${params}`),
      ]);

      const valueData = await valueRes.json();
      const rentData = await rentRes.json();

      const estimatedValue = valueData.price ?? null;
      const valueLow = valueData.priceRangeLow ?? null;
      const valueHigh = valueData.priceRangeHigh ?? null;
      const estimatedRent = rentData.rent ?? null;

      setForm((f) => ({
        ...f,
        rentcastValue: estimatedValue,
        rentcastValueLow: valueLow,
        rentcastValueHigh: valueHigh,
        rentcastRent: estimatedRent,
        estimatedValueConfirmed: estimatedValue ? Math.round(estimatedValue).toString() : f.homeValue,
        monthlyRentConfirmed: estimatedRent ? Math.round(estimatedRent).toString() : "3950",
      }));
    } catch {
      setForm((f) => ({
        ...f,
        estimatedValueConfirmed: f.homeValue || "",
        monthlyRentConfirmed: f.monthlyRentConfirmed || "3950",
      }));
    } finally {
      setRentcastLoading(false);
    }
  }

  function setField(key: keyof FormState, value: string | number | null) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  function goNext() {
    resetZoom();
    setStep((s) => s + 1);
  }

  function goBack() {
    resetZoom();
    setStep((s) => Math.max(0, s - 1));
  }

  // ── Validate each step ────────────────────────────────────────────
  function validateStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 0) {
      if (!form.address.trim()) errs.address = "Please enter your property address.";
    } else if (step === 1) {
      if (!form.estimatedValueConfirmed) errs.estimatedValueConfirmed = "Please enter or confirm your home value.";
      if (!form.monthlyRentConfirmed) errs.monthlyRentConfirmed = "Please confirm the monthly rent estimate.";
    } else if (step === 2) {
      if (!form.homeValue) errs.homeValue = "Please enter your estimated home value.";
      if (!form.purchasePrice) errs.purchasePrice = "Please enter the original purchase price.";
      if (!form.purchaseYear) errs.purchaseYear = "Please select the year you purchased.";
    } else if (step === 3) {
      if (!form.mortgageBalance) errs.mortgageBalance = "Please enter your mortgage balance (enter 0 if paid off).";
      if (!form.interestRate) errs.interestRate = "Please enter your interest rate.";
    } else if (step === 5) {
      if (!form.phone) errs.phone = "Phone number is required.";
      if (!form.email) errs.email = "Email address is required.";
    } else if (step === 6) {
      if (!form.firstName.trim()) errs.firstName = "Please enter your first name.";
      if (!form.lastName.trim()) errs.lastName = "Please enter your last name.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Step 5: Validate phone + email via API ─────────────────────────
  async function handleContactContinue() {
    if (!validateStep()) return;
    setLoading(true);
    const errs: Record<string, string> = {};

    try {
      const [phoneRes, emailRes] = await Promise.all([
        fetch("/api/validate-phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        }),
        fetch("/api/validate-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        }),
      ]);

      const phoneData = await phoneRes.json();
      const emailData = await emailRes.json();

      if (!phoneData.valid) errs.phone = phoneData.error || "Invalid phone number.";
      if (!emailData.valid) errs.email = emailData.error || "Invalid email address.";
    } catch {
      // Allow through on error
    } finally {
      setLoading(false);
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    goNext();
  }

  // ── Final submit ────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!validateStep()) return;
    setSubmitting(true);

    try {
      const formData: RVSFormData = {
        address: form.address,
        homeValue: parseDollar(form.estimatedValueConfirmed || form.homeValue),
        purchasePrice: parseDollar(form.purchasePrice),
        purchaseYear: parseInt(form.purchaseYear) || 2010,
        mortgageBalance: parseDollar(form.mortgageBalance),
        interestRate: parseFloat(form.interestRate) || 0,
        titleOwnership: (form.titleOwnership as "single" | "multiple") || "single",
        monthlyRentOverride: parseDollar(form.monthlyRentConfirmed) || null,
        rentcastEstimatedValue: form.rentcastValue,
        rentcastEstimatedRent: form.rentcastRent,
        beds: parseFloat(form.beds) || undefined,
        baths: parseFloat(form.baths) || undefined,
        sqft: parseFloat(form.sqft) || undefined,
        yearBuilt: parseInt(form.yearBuilt) || undefined,
        propertyType: form.propertyType || undefined,
      };

      const results = calculate(formData);

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.usemasterkey.com";

      // Save to Supabase
      const saveRes = await fetch("/api/rent-vs-sell/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: formData, results }),
      });
      const saved = await saveRes.json();
      const reportId = saved.id;
      const reportUrl = saved.url || `${siteUrl}/rent-vs-sell/results?id=${reportId}`;

      // Fire GHL webhook
      const webhookPayload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone.replace(/\D/g, ""),
        email: form.email,
        propertyAddress: form.address,
        homeValue: fmt(formData.homeValue),
        purchasePrice: fmt(formData.purchasePrice),
        purchaseYear: form.purchaseYear,
        mortgageBalance: fmt(formData.mortgageBalance),
        interestRate: form.interestRate,
        titleOwnership: form.titleOwnership,
        rentcastEstimatedValue: form.rentcastValue,
        rentcastEstimatedRent: form.rentcastRent,
        rentcastConfirmedRent: form.monthlyRentConfirmed,
        verdict5yr: results.verdict5yr,
        verdict10yr: results.verdict10yr,
        sellNetProceeds: Math.round(results.sell.saleAfterTax),
        rentWealth10yr: Math.round(results.rent.rentWealthAt10yr),
        reportUrl,
        formType: "rent-vs-sell",
        source: "rent-vs-sell-quiz",
        submittedAt: new Date().toISOString(),
      };

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      }).catch(() => {});

      const d = btoa(JSON.stringify(webhookPayload));

      router.push(
        `/rent-vs-sell/confirmation?id=${reportId}&email=${encodeURIComponent(form.email)}&phone=${encodeURIComponent(form.phone)}&name=${encodeURIComponent(form.firstName)}&d=${encodeURIComponent(d)}`
      );
    } catch (err) {
      console.error("Submit error:", err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Progress bar width ───────────────────────────────────────────
  const progressPct = Math.round((displayStep / TOTAL_STEPS) * 100);

  // ── Step 1: Recalculate ──────────────────────────────────────────
  function handleRecalculate() {
    fetchRentcast(form.address, form.beds, form.baths, form.sqft);
  }

  // ── Year options ─────────────────────────────────────────────────
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 1900; y--) years.push(y);

  // ── Input style ──────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    border: "1.5px solid #d1d5db",
    borderRadius: 10,
    outline: "none",
    background: "#fff",
    color: "#111827",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    color: "#374151",
    marginBottom: 8,
    fontSize: 15,
  };

  const errorStyle: React.CSSProperties = {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6,
  };

  const btnPrimary: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s",
    width: "100%",
    justifyContent: "center",
  };

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div
        style={{
          borderBottom: "1px solid #f3f4f6",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link
          href="/rent-vs-sell"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#6b7280",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
        <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
          Step {displayStep} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "#e5e7eb" }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "linear-gradient(to right, #3b82f6, #22c55e)",
            transition: "width 0.4s ease",
            borderRadius: 999,
          }}
        />
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "48px 24px 80px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>

          {/* ── Step 0: Address ──────────────────────────────────── */}
          {step === 0 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                What&apos;s the address of the property?
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                We&apos;ll look up your property details and local market data automatically.
              </p>
              <label style={labelStyle} htmlFor="address">Property Address</label>
              <input
                id="address"
                type="text"
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="123 Oak Street, Thousand Oaks, CA 91360"
                style={{ ...inputStyle, ...(errors.address ? { borderColor: "#dc2626" } : {}) }}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && validateStep() && goNext()}
              />
              {errors.address && <p style={errorStyle}>{errors.address}</p>}
              <button
                style={{ ...btnPrimary, marginTop: 24 }}
                onClick={() => validateStep() && goNext()}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 1: Rentcast confirm ──────────────────────────── */}
          {step === 1 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                Let&apos;s confirm your property details
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 28, fontSize: 15 }}>
                {form.address}
              </p>

              {rentcastLoading ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}>
                  <div className="spinner-border text-primary" style={{ width: 36, height: 36 }} role="status" />
                  <p style={{ marginTop: 16, fontWeight: 500 }}>Looking up your property…</p>
                </div>
              ) : (
                <>
                  {/* Property summary */}
                  <div
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: "20px 24px",
                      marginBottom: 28,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <label style={{ ...labelStyle, fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>BEDS</label>
                        <input
                          type="number"
                          value={form.beds}
                          onChange={(e) => setField("beds", e.target.value)}
                          style={{ ...inputStyle, textAlign: "center" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>BATHS</label>
                        <input
                          type="number"
                          step="0.5"
                          value={form.baths}
                          onChange={(e) => setField("baths", e.target.value)}
                          style={{ ...inputStyle, textAlign: "center" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>SQ FT</label>
                        <input
                          type="number"
                          value={form.sqft}
                          onChange={(e) => setField("sqft", e.target.value)}
                          style={{ ...inputStyle, textAlign: "center" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      {form.propertyType && (
                        <span style={{ fontSize: 13, color: "#6b7280", background: "#e5e7eb", borderRadius: 6, padding: "3px 10px" }}>
                          {form.propertyType}
                        </span>
                      )}
                      {form.yearBuilt && (
                        <span style={{ fontSize: 13, color: "#6b7280", background: "#e5e7eb", borderRadius: 6, padding: "3px 10px" }}>
                          Built {form.yearBuilt}
                        </span>
                      )}
                      <button
                        onClick={handleRecalculate}
                        style={{
                          background: "none",
                          border: "1.5px solid #d1d5db",
                          borderRadius: 8,
                          padding: "5px 14px",
                          fontSize: 13,
                          cursor: "pointer",
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        ↻ Recalculate
                      </button>
                    </div>
                  </div>

                  {/* Value estimate */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle} htmlFor="estimatedValue">
                      Estimated Home Value
                    </label>
                    {form.rentcastValue && (
                      <>
                        {/* Value range bar */}
                        <div style={{ position: "relative", height: 8, background: "#e5e7eb", borderRadius: 999, marginBottom: 8 }}>
                          {form.rentcastValueLow && form.rentcastValueHigh && (
                            <div
                              style={{
                                position: "absolute",
                                left: `${Math.max(0, ((form.rentcastValue - form.rentcastValueLow) / (form.rentcastValueHigh - form.rentcastValueLow)) * 100)}%`,
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 16,
                                height: 16,
                                background: "#2563eb",
                                borderRadius: "50%",
                                border: "3px solid #fff",
                                boxShadow: "0 0 0 2px #2563eb",
                              }}
                            />
                          )}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background: "linear-gradient(to right, #bfdbfe, #2563eb, #bfdbfe)",
                              borderRadius: 999,
                              opacity: 0.5,
                            }}
                          />
                        </div>
                        {form.rentcastValueLow && form.rentcastValueHigh && (
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
                            <span>${fmt(form.rentcastValueLow)}</span>
                            <span>${fmt(form.rentcastValueHigh)}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
                      <input
                        id="estimatedValue"
                        type="text"
                        inputMode="numeric"
                        value={form.estimatedValueConfirmed ? formatDollarInput(form.estimatedValueConfirmed) : ""}
                        onChange={(e) => setField("estimatedValueConfirmed", e.target.value.replace(/,/g, ""))}
                        placeholder="975,000"
                        style={{ ...inputStyle, paddingLeft: 28, ...(errors.estimatedValueConfirmed ? { borderColor: "#dc2626" } : {}) }}
                      />
                    </div>
                    {errors.estimatedValueConfirmed && <p style={errorStyle}>{errors.estimatedValueConfirmed}</p>}
                  </div>

                  {/* Rent estimate */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle} htmlFor="monthlyRent">Monthly Rent Estimate</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
                      <input
                        id="monthlyRent"
                        type="text"
                        inputMode="numeric"
                        value={form.monthlyRentConfirmed ? formatDollarInput(form.monthlyRentConfirmed) : ""}
                        onChange={(e) => setField("monthlyRentConfirmed", e.target.value.replace(/,/g, ""))}
                        placeholder="3,950"
                        style={{ ...inputStyle, paddingLeft: 28, ...(errors.monthlyRentConfirmed ? { borderColor: "#dc2626" } : {}) }}
                      />
                    </div>
                    <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                      This figure is based on local area averages. Your home&apos;s actual rental value may differ.{" "}
                      <Link href="/contact" style={{ color: "#2563eb" }}>Contact MasterKey</Link> for a free rental analysis.
                    </p>
                    {errors.monthlyRentConfirmed && <p style={errorStyle}>{errors.monthlyRentConfirmed}</p>}
                  </div>
                </>
              )}

              <button
                style={{ ...btnPrimary, opacity: rentcastLoading ? 0.6 : 1 }}
                onClick={() => !rentcastLoading && validateStep() && goNext()}
                disabled={rentcastLoading}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 2: Purchase details ──────────────────────────── */}
          {step === 2 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                Tell us about your purchase
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                This helps us calculate your capital gains exposure.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="homeValue2">Current Home Value</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
                  <input
                    id="homeValue2"
                    type="text"
                    inputMode="numeric"
                    value={form.homeValue ? formatDollarInput(form.homeValue) : (form.estimatedValueConfirmed ? formatDollarInput(form.estimatedValueConfirmed) : "")}
                    onChange={(e) => setField("homeValue", e.target.value.replace(/,/g, ""))}
                    placeholder="975,000"
                    style={{ ...inputStyle, paddingLeft: 28, ...(errors.homeValue ? { borderColor: "#dc2626" } : {}) }}
                  />
                </div>
                {errors.homeValue && <p style={errorStyle}>{errors.homeValue}</p>}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="purchasePrice">Original Purchase Price</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
                  <input
                    id="purchasePrice"
                    type="text"
                    inputMode="numeric"
                    value={form.purchasePrice ? formatDollarInput(form.purchasePrice) : ""}
                    onChange={(e) => setField("purchasePrice", e.target.value.replace(/,/g, ""))}
                    placeholder="600,000"
                    style={{ ...inputStyle, paddingLeft: 28, ...(errors.purchasePrice ? { borderColor: "#dc2626" } : {}) }}
                  />
                </div>
                {errors.purchasePrice && <p style={errorStyle}>{errors.purchasePrice}</p>}
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="purchaseYear">Year Purchased</label>
                <select
                  id="purchaseYear"
                  value={form.purchaseYear}
                  onChange={(e) => setField("purchaseYear", e.target.value)}
                  style={{ ...inputStyle, ...(errors.purchaseYear ? { borderColor: "#dc2626" } : {}) }}
                >
                  <option value="">Select year…</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {errors.purchaseYear && <p style={errorStyle}>{errors.purchaseYear}</p>}
              </div>

              <button style={btnPrimary} onClick={() => {
                // Sync homeValue from estimatedValueConfirmed if empty
                if (!form.homeValue && form.estimatedValueConfirmed) {
                  setForm((f) => ({ ...f, homeValue: f.estimatedValueConfirmed }));
                }
                validateStep() && goNext();
              }}>
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 3: Mortgage ──────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                What&apos;s your mortgage situation?
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                Enter 0 if your home is paid off.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="mortgageBalance">Current Mortgage Balance</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
                  <input
                    id="mortgageBalance"
                    type="text"
                    inputMode="numeric"
                    value={form.mortgageBalance ? formatDollarInput(form.mortgageBalance) : ""}
                    onChange={(e) => setField("mortgageBalance", e.target.value.replace(/,/g, ""))}
                    placeholder="350,000"
                    style={{ ...inputStyle, paddingLeft: 28, ...(errors.mortgageBalance ? { borderColor: "#dc2626" } : {}) }}
                  />
                </div>
                {errors.mortgageBalance && <p style={errorStyle}>{errors.mortgageBalance}</p>}
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="interestRate">Interest Rate (%)</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={form.interestRate}
                    onChange={(e) => setField("interestRate", e.target.value)}
                    placeholder="6.5"
                    style={{ ...inputStyle, paddingRight: 36, ...(errors.interestRate ? { borderColor: "#dc2626" } : {}) }}
                  />
                  <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>%</span>
                </div>
                {errors.interestRate && <p style={errorStyle}>{errors.interestRate}</p>}
              </div>

              <button style={btnPrimary} onClick={() => validateStep() && goNext()}>
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 4: Title ownership (auto-advance) ──────────── */}
          {step === 4 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                Who is on the title?
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                This affects your IRS capital gains exclusion — $250K for single, $500K for joint/multiple.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { value: "single", label: "Just me", desc: "$250,000 capital gains exclusion" },
                  { value: "multiple", label: "Me and my spouse / partner", desc: "$500,000 capital gains exclusion" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setField("titleOwnership", opt.value);
                      setTimeout(goNext, 200);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: form.titleOwnership === opt.value ? "#eff6ff" : "#fff",
                      border: `2px solid ${form.titleOwnership === opt.value ? "#2563eb" : "#e5e7eb"}`,
                      borderRadius: 12,
                      padding: "20px 24px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 4 }}>{opt.label}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{opt.desc}</div>
                    </div>
                    {form.titleOwnership === opt.value && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="12" fill="#2563eb" />
                        <path d="M7 12l3.5 3.5L17 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 5: Contact ───────────────────────────────────── */}
          {step === 5 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                Where should we send your report?
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                Your personalized analysis will be delivered via text and email.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="phone">Mobile Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="(805) 555-0100"
                  style={{ ...inputStyle, ...(errors.phone ? { borderColor: "#dc2626" } : {}) }}
                />
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  style={{ ...inputStyle, ...(errors.email ? { borderColor: "#dc2626" } : {}) }}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>

              <button
                style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
                onClick={handleContactContinue}
                disabled={loading}
              >
                {loading ? "Verifying…" : "Continue →"}
              </button>
            </div>
          )}

          {/* ── Step 6: Name + Submit ──────────────────────────────── */}
          {step === 6 && (
            <div>
              <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.75rem)", fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                Last step — what&apos;s your name?
              </h1>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>
                We&apos;ll personalize your report with your name.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={labelStyle} htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    placeholder="Jane"
                    style={{ ...inputStyle, ...(errors.firstName ? { borderColor: "#dc2626" } : {}) }}
                    autoFocus
                  />
                  {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
                </div>
                <div>
                  <label style={labelStyle} htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    placeholder="Smith"
                    style={{ ...inputStyle, ...(errors.lastName ? { borderColor: "#dc2626" } : {}) }}
                  />
                  {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
                </div>
              </div>

              {errors.submit && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#dc2626", fontSize: 14 }}>
                  {errors.submit}
                </div>
              )}

              <button
                style={{ ...btnPrimary, background: submitting ? "#93c5fd" : "#2563eb" }}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Generating your report…" : "Get My Analysis →"}
              </button>

              <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 14, textAlign: "center" }}>
                By submitting, you agree to be contacted by MasterKey Real Estate. No spam — just your report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page export with Suspense ───────────────────────────────────────────
export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>}>
      <QuizInner />
    </Suspense>
  );
}
