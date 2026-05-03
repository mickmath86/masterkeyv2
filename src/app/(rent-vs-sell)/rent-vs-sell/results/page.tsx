"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RVSResults } from "@/lib/rvs-calculate";

// ── Types ──────────────────────────────────────────────────────────────
interface ReportData {
  form: {
    address?: string;
    homeValue?: number;
    mortgageBalance?: number;
    titleOwnership?: string;
  };
  results: RVSResults;
}

// ── Helpers ────────────────────────────────────────────────────────────
function fmt(n: number | null | undefined): string {
  if (n == null || isNaN(n)) return "—";
  return "$" + Math.round(n).toLocaleString();
}

function InfoRow({
  label,
  value,
  tip,
  color,
}: {
  label: string;
  value: string;
  tip?: string;
  color?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: "#374151" }}>{label}</span>
          {tip && (
            <button
              onClick={() => setOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
                padding: 0,
                fontSize: 14,
                lineHeight: 1,
              }}
              aria-label="More info"
            >
              ⓘ
            </button>
          )}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: color || "#111827" }}>
          {value}
        </span>
      </div>
      {tip && open && (
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 13,
            color: "#1e40af",
            marginBottom: 4,
            lineHeight: 1.6,
          }}
        >
          {tip}
        </div>
      )}
    </div>
  );
}

// ── Results inner ──────────────────────────────────────────────────────
function ResultsInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [report, setReport] = useState<ReportData | null>(null);
  const [status, setStatus] = useState<"loading" | "found" | "not_found" | "expired">("loading");

  useEffect(() => {
    if (!id) {
      setStatus("not_found");
      return;
    }

    fetch(`/api/rent-vs-sell/report?id=${id}`)
      .then(async (res) => {
        if (res.status === 410) {
          setStatus("expired");
          return;
        }
        if (!res.ok) {
          setStatus("not_found");
          return;
        }
        const data = await res.json();
        setReport(data.data);
        setStatus("found");
      })
      .catch(() => setStatus("not_found"));
  }, [id]);

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          gap: 16,
        }}
      >
        <div className="spinner-border" style={{ width: 40, height: 40, borderColor: "#2563eb", borderRightColor: "transparent" }} role="status" />
        <p style={{ fontWeight: 500, fontSize: 16 }}>Loading your report…</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Report Expired</h1>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>This analysis expired after 30 days. Run a fresh one — it only takes 2 minutes.</p>
        <Link href="/rent-vs-sell/quiz" style={{ background: "#2563eb", color: "#fff", borderRadius: 10, padding: "14px 28px", textDecoration: "none", fontWeight: 700 }}>
          Run a New Analysis →
        </Link>
      </div>
    );
  }

  if (status === "not_found" || !report) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Analysis Not Found</h1>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>We couldn&apos;t find this analysis. It may have expired or the link may be incorrect.</p>
        <Link href="/rent-vs-sell" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "underline" }}>← Back to Rent vs. Sell</Link>
      </div>
    );
  }

  const { results, form } = report;
  const { sell, rent, verdict5yr, verdict10yr, diff5yr, diff10yr } = results;

  function verdictLabel(v: string) {
    if (v === "sell") return "Selling wins";
    if (v === "rent") return "Renting wins";
    return "It's too close to call";
  }
  function verdictColor(v: string) {
    if (v === "sell") return "#2563eb";
    if (v === "rent") return "#16a34a";
    return "#7c3aed";
  }

  const overallVerdict = verdict10yr;
  const chartData = [
    {
      name: "5 Years",
      "Sell + Invest": Math.round(sell.saleInvested5yr),
      "Rent + Equity": Math.round(rent.rentWealthAt5yr),
    },
    {
      name: "10 Years",
      "Sell + Invest": Math.round(sell.saleInvested10yr),
      "Rent + Equity": Math.round(rent.rentWealthAt10yr),
    },
  ];

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/rent-vs-sell" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back
        </Link>
        <button
          onClick={() => window.print()}
          style={{ background: "none", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "7px 16px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 600 }}
        >
          Print / Save PDF
        </button>
      </div>

      <div className="tf-container" style={{ maxWidth: 760, paddingTop: 40 }}>

        {/* Property address */}
        {form.address && (
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 8, fontWeight: 500 }}>
            📍 {form.address}
          </p>
        )}

        {/* Verdict banner */}
        <div
          style={{
            background: verdictColor(overallVerdict),
            borderRadius: 14,
            padding: "24px 28px",
            marginBottom: 32,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85, marginBottom: 6 }}>
            10-Year Verdict
          </div>
          <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 8 }}>
            {verdictLabel(overallVerdict)}
          </h1>
          <p style={{ opacity: 0.9, fontSize: 15, margin: 0 }}>
            {overallVerdict === "sell" && `Selling and investing the proceeds builds ${fmt(diff10yr)} more wealth over 10 years.`}
            {overallVerdict === "rent" && `Renting builds ${fmt(Math.abs(diff10yr))} more wealth over 10 years vs. selling.`}
            {overallVerdict === "close" && "Both paths produce similar long-term wealth. Your decision may come down to personal factors."}
          </p>
        </div>

        {/* Chart */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "28px", marginBottom: 28, border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Wealth Comparison</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#6b7280" }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip formatter={(value) => { const n = typeof value === 'number' ? value : typeof value === 'string' ? parseFloat(value) : null; return fmt(n); }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Bar dataKey="Sell + Invest" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Rent + Equity" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 14,
            marginBottom: 28,
          }}
        >
          {[
            { label: "Sell — 5yr", value: fmt(sell.saleInvested5yr), color: "#2563eb", bg: "#eff6ff" },
            { label: "Sell — 10yr", value: fmt(sell.saleInvested10yr), color: "#2563eb", bg: "#eff6ff" },
            { label: "Rent — 5yr", value: fmt(rent.rentWealthAt5yr), color: "#16a34a", bg: "#f0fdf4" },
            { label: "Rent — 10yr", value: fmt(rent.rentWealthAt10yr), color: "#16a34a", bg: "#f0fdf4" },
          ].map((s) => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Two-column detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
          {/* Sell column */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "2px solid #bfdbfe" }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#2563eb", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🏷️ Sell Scenario
            </h3>
            <InfoRow label="Sale Price" value={fmt(form.homeValue)} color="#2563eb" />
            <InfoRow
              label="Agent Commission (5.5%)"
              value={`-${fmt(sell.agentFee)}`}
              tip="Standard seller-side commission in Ventura County."
            />
            <InfoRow
              label="Closing Costs + Staging"
              value={`-${fmt(sell.closingAndStagingCosts)}`}
              tip="1% closing costs + $3,500 staging estimate."
            />
            <InfoRow
              label="Mortgage Payoff"
              value={`-${fmt(sell.mortgagePayoff)}`}
              tip="Your remaining mortgage balance is paid off at close."
            />
            <InfoRow
              label="Capital Gains Tax"
              value={`-${fmt(sell.capitalGains.capitalGainsTax)}`}
              tip={`IRS Section 121 exclusion of ${fmt(sell.capitalGains.exclusion)} applied. Taxable gain: ${fmt(sell.capitalGains.taxableGain)}. Rate: 15%.`}
              color="#dc2626"
            />
            <InfoRow label="Net After Tax" value={fmt(sell.saleAfterTax)} color="#2563eb" />
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "2px solid #bfdbfe" }}>
              <InfoRow label="Invested at 7% — 5yr" value={fmt(sell.saleInvested5yr)} color="#2563eb" />
              <InfoRow label="Invested at 7% — 10yr" value={fmt(sell.saleInvested10yr)} color="#2563eb" />
            </div>
          </div>

          {/* Rent column */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "2px solid #bbf7d0" }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#16a34a", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🏠 Rent Scenario
            </h3>
            <InfoRow label="Monthly Rent" value={fmt(rent.monthlyRent)} color="#16a34a" />
            <InfoRow
              label="Property Tax"
              value={`-${fmt(rent.expenses.monthlyPropertyTax)}/mo`}
              tip="0.7% effective rate, Ventura County average."
            />
            <InfoRow label="Insurance" value={`-${fmt(rent.expenses.monthlyInsurance)}/mo`} />
            <InfoRow
              label="Management Fee (9%)"
              value={`-${fmt(rent.expenses.monthlyMgmtFee)}/mo`}
              tip="MasterKey's full-service property management rate."
            />
            <InfoRow label="Maintenance (1%)" value={`-${fmt(rent.expenses.monthlyMaintenance)}/mo`} />
            <InfoRow
              label="Vacancy Allowance (5%)"
              value={`-${fmt(rent.expenses.monthlyVacancy)}/mo`}
              tip="Industry standard vacancy buffer for Ventura County."
            />
            {rent.expenses.monthlyMortgage > 0 && (
              <InfoRow label="Mortgage P&I" value={`-${fmt(rent.expenses.monthlyMortgage)}/mo`} />
            )}
            <InfoRow
              label="Monthly Cash Flow"
              value={fmt(rent.monthlyCashFlow) + "/mo"}
              color={rent.monthlyCashFlow >= 0 ? "#16a34a" : "#dc2626"}
            />
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "2px solid #bbf7d0" }}>
              <InfoRow label="Total Wealth — 5yr" value={fmt(rent.rentWealthAt5yr)} color="#16a34a" />
              <InfoRow label="Total Wealth — 10yr" value={fmt(rent.rentWealthAt10yr)} color="#16a34a" />
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Methodology & Assumptions</h3>
          <ul style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Home appreciation: 4.5%/year (Ventura County historical avg)</li>
            <li>Investment returns: 7%/year (S&P 500 long-run avg)</li>
            <li>Mortgage: 25-year remaining amortization assumed</li>
            <li>Capital gains: IRS Section 121 primary residence exclusion applied</li>
            <li>Rent wealth = cumulative cash flow + appreciated home value − remaining mortgage</li>
            <li>This is an estimate, not financial advice. Consult a CPA or financial advisor.</li>
          </ul>
        </div>

        {/* CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)",
            borderRadius: 16,
            padding: "40px 36px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
            Ready to take the next step?
          </h3>
          <p style={{ opacity: 0.9, marginBottom: 24, fontSize: 15 }}>
            Schedule a free consultation with a MasterKey advisor — no pressure, just clarity.
          </p>
          <a
            href="https://www.usemasterkey.com/contact"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#1d4ed8",
              borderRadius: 10,
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            Schedule a Free Consultation →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Page export ────────────────────────────────────────────────────────
export default function ResultsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>}>
      <ResultsInner />
    </Suspense>
  );
}
