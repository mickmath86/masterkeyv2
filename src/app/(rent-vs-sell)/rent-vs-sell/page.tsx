import Link from "next/link";
import Header from "@/components/header/Header";
import Footer1 from "@/components/footer/Footer1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Should I Sell or Rent My Home? | MasterKey Real Estate",
  description:
    "Get an instant, personalized side-by-side comparison. See your capital gains tax exposure, monthly cash flow, and total wealth built over 5 and 10 years.",
};

export default function RentVsSellPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
            paddingTop: 80,
            paddingBottom: 80,
          }}
        >
          <div className="tf-container">
            <div className="row align-items-center g-5">
              {/* Left column */}
              <div className="col-lg-6">
                <span
                  style={{
                    display: "inline-block",
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    borderRadius: 999,
                    padding: "4px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 20,
                    letterSpacing: "0.02em",
                  }}
                >
                  Free Analysis · Conejo Valley
                </span>
                <h1
                  style={{
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#111827",
                    marginBottom: 20,
                  }}
                >
                  Should you sell your{" "}
                  <span style={{ color: "#2563eb" }}>Thousand Oaks home</span>{" "}
                  — or rent it out?
                </h1>
                <p
                  style={{
                    fontSize: 18,
                    color: "#4b5563",
                    lineHeight: 1.7,
                    marginBottom: 36,
                    maxWidth: 520,
                  }}
                >
                  Answer 6 quick questions and get an instant, personalized
                  side-by-side comparison — including your capital gains tax
                  exposure, monthly cash flow, and total wealth built over 5
                  and 10 years.
                </p>
                <Link
                  href="/rent-vs-sell/quiz"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "16px 32px",
                    fontSize: 17,
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "background 0.2s",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
                  }}
                >
                  Run My Free Analysis
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h12M11 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <p
                  style={{
                    fontSize: 13,
                    color: "#9ca3af",
                    marginTop: 14,
                  }}
                >
                  Free · No credit card · Results in under 2 minutes
                </p>
              </div>

              {/* Right column — What you'll get card */}
              <div className="col-lg-6">
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "32px 36px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 24,
                    }}
                  >
                    What you&apos;ll get
                  </h3>
                  {[
                    {
                      icon: "💰",
                      title: "Net proceeds from selling",
                      desc: "After agent fees, closing costs & mortgage payoff",
                    },
                    {
                      icon: "📊",
                      title: "Capital gains tax exposure",
                      desc: "IRS Section 121 exclusion applied automatically",
                    },
                    {
                      icon: "🏠",
                      title: "Monthly rental cash flow",
                      desc: "Rent estimate minus all operating expenses",
                    },
                    {
                      icon: "📈",
                      title: "5-year & 10-year wealth comparison",
                      desc: "Sell-and-invest vs. hold-and-rent side by side",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{
                        display: "flex",
                        gap: 16,
                        marginBottom: 20,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 22,
                          minWidth: 40,
                          textAlign: "center",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#111827",
                            fontSize: 15,
                            marginBottom: 2,
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7280" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature Cards ─────────────────────────────────────── */}
        <section style={{ padding: "72px 0", background: "#fff" }}>
          <div className="tf-container">
            <div
              style={{
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 12,
                }}
              >
                Everything you need to make the right call
              </h2>
              <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
                Our analysis engine runs Ventura County-specific numbers — not national averages.
              </p>
            </div>
            <div className="row g-4">
              {[
                {
                  color: "#2563eb",
                  bg: "#eff6ff",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: "Sell Scenario",
                  desc: "We calculate your net proceeds after agent commission (5.5%), closing costs, staging, mortgage payoff, and capital gains tax — so you know your real take-home.",
                },
                {
                  color: "#16a34a",
                  bg: "#f0fdf4",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  ),
                  title: "Rent Scenario",
                  desc: "We estimate your monthly cash flow after property tax, insurance, management fees (9%), maintenance, vacancy, and mortgage — using local Ventura County data.",
                },
                {
                  color: "#7c3aed",
                  bg: "#f5f3ff",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                  title: "Data-Driven Verdict",
                  desc: "We compare 5-year and 10-year wealth projections for both paths and give you a clear recommendation — sell, rent, or it's too close to call.",
                },
              ].map((card) => (
                <div key={card.title} className="col-md-4">
                  <div
                    style={{
                      background: card.bg,
                      borderRadius: 14,
                      padding: "28px 28px 24px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        background: "#fff",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: 10,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Strip ─────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)",
            padding: "64px 0",
            textAlign: "center",
          }}
        >
          <div className="tf-container">
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Ready to find out which path builds more wealth?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 16,
                marginBottom: 32,
              }}
            >
              Takes less than 2 minutes. Free. No obligation.
            </p>
            <Link
              href="/rent-vs-sell/quiz"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                color: "#1d4ed8",
                borderRadius: 10,
                padding: "16px 36px",
                fontSize: 17,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              Run My Free Analysis →
            </Link>
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
