import Link from "next/link";
import Layout from "@/components/layouts/Layout-defaul";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Should I Sell or Rent My Home? | MasterKey Real Estate",
  description:
    "Get an instant, personalized side-by-side comparison. See your capital gains tax exposure, monthly cash flow, and total wealth built over 5 and 10 years.",
};

export default function RentVsSellPage() {
  return (
    <Layout>
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-light-color tf-spacing-1">
          <div className="tf-container">
            <div className="row align-items-center">
              {/* Left column */}
              <div className="col-lg-6">
                <div className="heading-section mb_20">
                  <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                    Free Analysis · Ventura County
                  </span>
                  <h2 className="split-text effect-blur-fade">
                    Should you sell your{" "}
                    <span style={{ color: "var(--Primary)" }}>Ventura County home</span>{" "}
                    — or rent it out?
                  </h2>
                </div>
                <p className="text-body-2 mb_32 split-text split-lines-transform" style={{ maxWidth: 520 }}>
                  Answer 6 quick questions and get an instant, personalized
                  side-by-side comparison — including your capital gains tax
                  exposure, monthly cash flow, and total wealth built over 5
                  and 10 years.
                </p>
                <Link href="/rent-vs-sell/quiz" className="tf-btn btn-bg-1 btn-px-32">
                  <span>Run My Free Analysis</span>
                  <span className="bg-effect"></span>
                </Link>
                <p className="text-caption-2 text_secondary-color-2 mb_4">
                  Free · No credit card · Results in under 2 minutes
                </p>
              </div>

              {/* Right column — What you'll get card */}
              <div className="col-lg-6">
                <div className="bg-white-color rounded-16 scrolling-effect effectRight" style={{ padding: "32px 36px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", border: "1px solid var(--Line)" }}>
                  <p className="text-label text_secondary-color-2 text-uppercase mb_24" style={{ letterSpacing: "0.08em" }}>
                    What you&apos;ll get
                  </p>
                  {[
                    {
                      icon: "icon-CurrencyDollar",
                      title: "Net proceeds from selling",
                      desc: "After agent fees, closing costs & mortgage payoff",
                    },
                    {
                      icon: "icon-ChartBar",
                      title: "Capital gains tax exposure",
                      desc: "IRS Section 121 exclusion applied automatically",
                    },
                    {
                      icon: "icon-HouseLine",
                      title: "Monthly rental cash flow",
                      desc: "Rent estimate minus all operating expenses",
                    },
                    {
                      icon: "icon-TrendUp",
                      title: "5-year & 10-year wealth comparison",
                      desc: "Sell-and-invest vs. hold-and-rent side by side",
                    },
                  ].map((item) => (
                    <div key={item.title} className="d-flex gap_16 mb_20 align-items-start">
                      <div className="rounded-12" style={{ width: 40, height: 40, minWidth: 40, background: "var(--Bg-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className={`${item.icon} text_primary-color`} style={{ fontSize: 20 }}></i>
                      </div>
                      <div>
                        <p className="text-label text_primary-color mb_4">{item.title}</p>
                        <p className="text-caption-1 text_secondary-color">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature Cards ─────────────────────────────────────── */}
        <section className="bg-white-color tf-spacing-1">
          <div className="tf-container">
            <div className="heading-section justify-content-center text-center mb_48">
              <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                How It Works
              </span>
              <h2 className="split-text effect-blur-fade">
                Everything you need to make the right call
              </h2>
            </div>
            <p className="text-body-2 text_secondary-color text-center mb_40 split-text split-lines-transform" style={{ maxWidth: 600, margin: "0 auto 40px" }}>
              Our analysis engine runs Ventura County-specific numbers — not national averages.
            </p>
            <div className="tf-grid-layout lg-col-3 md-col-2">
              {[
                {
                  icon: "icon-Stack",
                  title: "Sell Scenario",
                  desc: "We calculate your net proceeds after agent commission (5.5%), closing costs, staging, mortgage payoff, and capital gains tax — so you know your real take-home.",
                },
                {
                  icon: "icon-HouseLine",
                  title: "Rent Scenario",
                  desc: "We estimate your monthly cash flow after property tax, insurance, management fees (9%), maintenance, vacancy, and mortgage — using local Ventura County data.",
                },
                {
                  icon: "icon-TrendUp",
                  title: "Data-Driven Verdict",
                  desc: "We compare 5-year and 10-year wealth projections for both paths and give you a clear recommendation — sell, rent, or it's too close to call.",
                },
              ].map((card, idx) => (
                <div key={card.title} className="scrolling-effect effectBottom" data-delay={`${0.2 + idx * 0.1}`}>
                  <div className="bg-light-color rounded-16" style={{ padding: "28px", height: "100%" }}>
                    <div className="bg-white-color rounded-12 mb_16" style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      <i className={`${card.icon} text_primary-color`} style={{ fontSize: 24 }}></i>
                    </div>
                    <h5 className="text_primary-color mb_12">{card.title}</h5>
                    <p className="text-caption-1 text_secondary-color">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Strip ─────────────────────────────────────────── */}
        <section className="bg-dark-color tf-spacing-1 text-center">
          <div className="tf-container">
            <div className="heading-section justify-content-center text-center mb_32">
              <h2 className="text_white split-text effect-blur-fade">
                Ready to find out which path builds more wealth?
              </h2>
            </div>
            <p className="text-body-2 text_color-1 mb_32 split-text split-lines-transform" style={{ maxWidth: 500, margin: "0 auto 32px" }}>
              Takes less than 2 minutes. Free. No obligation.
            </p>
            <Link href="/rent-vs-sell/quiz" className="tf-btn btn-px-32 scrolling-effect effectBottom">
              <span>Run My Free Analysis</span>
              <span className="bg-effect"></span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
