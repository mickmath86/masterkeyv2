"use client";
import React, { useState, useEffect, useCallback } from "react";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing?: ListingDetail;
};

const LOAN_TERMS = [
    { label: "30 Years (360 mo)", months: 360 },
    { label: "20 Years (240 mo)", months: 240 },
    { label: "15 Years (180 mo)", months: 180 },
    { label: "10 Years (120 mo)", months: 120 },
];

const DEFAULT_RATE = 7.0; // %
const DEFAULT_DOWN_PCT = 20;

function calcMonthlyPayment(principal: number, annualRatePct: number, months: number): number {
    if (principal <= 0 || annualRatePct <= 0 || months <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function Caculator({ listing }: Props) {
    const [downMode, setDownMode] = useState<"percent" | "amount">("percent");
    const [downPct, setDownPct] = useState(DEFAULT_DOWN_PCT);
    const price = listing?.price ?? 0;
    const [downAmt, setDownAmt] = useState(Math.round(price * DEFAULT_DOWN_PCT / 100));
    const [interestRate, setInterestRate] = useState(DEFAULT_RATE);
    const [termMonths, setTermMonths] = useState(360);

    // When price or downPct changes, sync downAmt
    useEffect(() => {
        if (downMode === "percent") {
            setDownAmt(Math.round(price * downPct / 100));
        }
    }, [downPct, price, downMode]);

    // When downAmt changes manually, sync downPct
    const handleDownAmtChange = useCallback((val: number) => {
        setDownAmt(val);
        if (price > 0) {
            setDownPct(Math.round((val / price) * 100 * 10) / 10);
        }
    }, [price]);

    const handleDownPctChange = useCallback((val: number) => {
        setDownPct(val);
        setDownAmt(Math.round(price * val / 100));
    }, [price]);

    const loanAmount = Math.max(0, price - downAmt);
    const monthlyPayment = calcMonthlyPayment(loanAmount, interestRate, termMonths);
    const totalPaid = monthlyPayment * termMonths;
    const totalInterest = totalPaid - loanAmount;

    const fmt = (n: number) =>
        n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    const fmtPrecise = (n: number) =>
        n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

    return (
        <div>
            <h5 className="properties-title mb_20">Loan Calculator</h5>
            <div className="wrap-form">
                {/* ── Inputs ── */}
                <div className="tf-grid-layout xl-col-4 md-col-2 mb_24">
                    {/* Home Price (read-only) */}
                    <fieldset>
                        <label htmlFor="calc-price" className="text-body-default text_primary-color mb_8">
                            Home Price
                        </label>
                        <input
                            id="calc-price"
                            type="text"
                            readOnly
                            value={fmt(price)}
                            className=""
                        />
                    </fieldset>

                    {/* Down Payment */}
                    <fieldset>
                        <div className="d-flex align-items-center justify-content-between mb_8">
                            <label className="text-body-default text_primary-color">Down Payment</label>
                            {/* Toggle */}
                            <div className="d-flex gap_4" style={{ fontSize: 12 }}>
                                <button
                                    type="button"
                                    onClick={() => setDownMode("percent")}
                                    style={{
                                        background: downMode === "percent" ? "var(--Text-primary)" : "transparent",
                                        color: downMode === "percent" ? "var(--White)" : "var(--Text-secondary)",
                                        border: "1px solid var(--Line)",
                                        borderRadius: 4,
                                        padding: "2px 8px",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                >%</button>
                                <button
                                    type="button"
                                    onClick={() => setDownMode("amount")}
                                    style={{
                                        background: downMode === "amount" ? "var(--Text-primary)" : "transparent",
                                        color: downMode === "amount" ? "var(--White)" : "var(--Text-secondary)",
                                        border: "1px solid var(--Line)",
                                        borderRadius: 4,
                                        padding: "2px 8px",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                >$</button>
                            </div>
                        </div>
                        {downMode === "percent" ? (
                            <div className="d-flex align-items-center gap_8">
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={downPct}
                                    onChange={(e) => handleDownPctChange(Number(e.target.value))}
                                    style={{ width: "70px", flexShrink: 0 }}
                                />
                                <span className="text-body-default text_secondary-color">
                                    = {fmt(downAmt)}
                                </span>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap_8">
                                <input
                                    type="number"
                                    min={0}
                                    max={price}
                                    step={1000}
                                    value={downAmt}
                                    onChange={(e) => handleDownAmtChange(Number(e.target.value))}
                                />
                                <span className="text-body-default text_secondary-color" style={{ whiteSpace: "nowrap" }}>
                                    ({downPct}%)
                                </span>
                            </div>
                        )}
                    </fieldset>

                    {/* Interest Rate */}
                    <fieldset>
                        <label htmlFor="calc-rate" className="text-body-default text_primary-color mb_8">
                            Interest Rate (%)
                        </label>
                        <input
                            id="calc-rate"
                            type="number"
                            min={0.1}
                            max={30}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                    </fieldset>

                    {/* Loan Term */}
                    <fieldset>
                        <label className="text-body-default text_primary-color mb_8">Loan Term</label>
                        <select
                            value={termMonths}
                            onChange={(e) => setTermMonths(Number(e.target.value))}
                            style={{
                                width: "100%",
                                height: 50,
                                border: "1px solid var(--Line)",
                                borderRadius: 8,
                                padding: "0 16px",
                                fontSize: 16,
                                color: "var(--Text-primary)",
                                background: "var(--White)",
                                cursor: "pointer",
                            }}
                        >
                            {LOAN_TERMS.map((t) => (
                                <option key={t.months} value={t.months}>{t.label}</option>
                            ))}
                        </select>
                    </fieldset>
                </div>

                {/* ── Results ── */}
                <ul className="info tf-grid-layout sm-col-3 gap_8 mb_24">
                    <li>
                        <p className="mb_4">Loan Amount:</p>
                        <div className="text-button text_primary-color fw-7" suppressHydrationWarning>
                            {fmt(loanAmount)}
                        </div>
                    </li>
                    <li>
                        <p className="mb_4">Monthly Payment:</p>
                        <div className="text-button text_primary-color fw-7" suppressHydrationWarning>
                            {fmtPrecise(monthlyPayment)}/mo
                        </div>
                    </li>
                    <li>
                        <p className="mb_4">Total Interest:</p>
                        <div className="text-button text_primary-color fw-7" suppressHydrationWarning>
                            {fmt(totalInterest)}
                        </div>
                    </li>
                </ul>

                {/* ── Pre-Approval CTA ── */}
                <div
                    style={{
                        borderTop: "1px solid var(--Line)",
                        paddingTop: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Avatar placeholder */}
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "var(--Bg-light)",
                            border: "2px solid var(--Line)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            color: "var(--Text-secondary-2)",
                        }}
                    >
                        <i className="icon-UserCircle"></i>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <p className="text-title fw-7 text_primary-color mb_4">
                            Barry Hollander — Lending Partner
                        </p>
                        <p className="text-body-default text_secondary-color mb_12">
                            Ready to get pre-approved? Barry can help you lock in your rate and move fast on this home.
                        </p>
                        <a
                            href="mailto:barry@masterkey.com"
                            className="tf-btn btn-bg-1 btn-px-24"
                        >
                            <span className="d-flex align-items-center gap_8">
                                <i className="icon-EnvelopeSimple"></i>
                                Get Pre-Approved
                            </span>
                            <span className="bg-effect"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
