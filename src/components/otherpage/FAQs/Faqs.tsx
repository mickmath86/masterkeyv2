import DropdownSelect2 from "@/components/common/DropdownSelect2";
import React from "react";
import { submitFAQQuestion } from "@/actions/faqAction";

export default function Faqs() {
    return (
        <>
            <div className="section-faqs tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="faq-item">
                                <h4 className="mb_18">Buying Property</h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1"
                                            className="accordion-title "
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What is the process of
                                                    buying a home from start to
                                                    finish?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1"
                                            className="collapse show"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    The home-buying process
                                                    usually starts with
                                                    evaluating your finances and
                                                    obtaining pre-approval for a
                                                    mortgage. Once you know your
                                                    budget, you can begin
                                                    searching for properties
                                                    that fit your needs and
                                                    preferences. After finding
                                                    the right home, you’ll make
                                                    an offer, and if it’s
                                                    accepted, you will enter
                                                    into a purchase agreement.
                                                </p>
                                                <p>
                                                    Next comes the home
                                                    inspection, appraisal, and
                                                    final mortgage approval.
                                                    Once all contingencies are
                                                    cleared and the paperwork is
                                                    completed, you’ll attend the
                                                    closing meeting to sign
                                                    documents and transfer
                                                    ownership. After closing,
                                                    the keys are yours and the
                                                    home officially becomes
                                                    yours.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    How much should I budget for
                                                    closing costs?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Closing costs typically
                                                    range from 2% to 5% of the
                                                    home&apos;s purchase price.
                                                    These costs can include loan
                                                    origination fees, appraisal
                                                    fees, title insurance,
                                                    taxes, and other related
                                                    expenses. It&apos;s
                                                    important to review the loan
                                                    estimate provided by your
                                                    lender to understand the
                                                    specific costs you&apos;ll
                                                    be responsible for at
                                                    closing.
                                                </p>
                                                <p>
                                                    Planning ahead for these
                                                    expenses ensures you’re
                                                    financially prepared and
                                                    helps avoid surprises during
                                                    the final stages of your
                                                    home purchase.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Do I need to get
                                                    pre-approved before starting
                                                    my home search?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    While it’s not required,
                                                    getting pre-approved before
                                                    starting your home search is
                                                    highly recommended.
                                                    Pre-approval gives you a
                                                    clear understanding of your
                                                    budget, strengthens your
                                                    offer in the eyes of
                                                    sellers, and can speed up
                                                    the closing process.
                                                </p>
                                                <p>
                                                    It also helps you identify
                                                    and resolve any potential
                                                    credit or financial issues
                                                    early, making your
                                                    home-buying journey smoother
                                                    and more efficient.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What’s the difference
                                                    between a fixed-rate and an
                                                    adjustable-rate mortgage?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    A fixed-rate mortgage has an
                                                    interest rate that remains
                                                    the same for the entire term
                                                    of the loan, providing
                                                    predictable monthly
                                                    payments. An adjustable-rate
                                                    mortgage (ARM), on the other
                                                    hand, has an interest rate
                                                    that may change periodically
                                                    based on market conditions,
                                                    which can result in lower
                                                    initial payments but
                                                    potential increases in the
                                                    future.
                                                </p>
                                                <p>
                                                    The best choice depends on
                                                    your financial situation,
                                                    how long you plan to stay in
                                                    the home, and your risk
                                                    tolerance for potential rate
                                                    changes.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    How long does it typically
                                                    take to close on a property?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    The closing process for a
                                                    property typically takes 30
                                                    to 45 days from the time
                                                    your offer is accepted. This
                                                    period allows for
                                                    inspections, appraisals,
                                                    finalizing your mortgage,
                                                    and completing all necessary
                                                    paperwork.
                                                </p>
                                                <p>
                                                    Delays can occur due to
                                                    issues with financing, title
                                                    searches, or repairs, so
                                                    staying in close
                                                    communication with your
                                                    lender and real estate agent
                                                    can help ensure a smooth
                                                    closing.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="faq-item">
                                <h4 className="mb_18">
                                    Investing in Real Estate
                                </h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq1"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-1"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What are the best types of
                                                    properties for first-time
                                                    investors?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-1"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Many first-time investors
                                                    start with single-family
                                                    homes, duplexes, or small
                                                    multi-family properties.
                                                    These types of properties
                                                    are generally easier to
                                                    manage and finance, and they
                                                    tend to attract stable
                                                    tenants.
                                                </p>
                                                <p>
                                                    Consider your investment
                                                    goals, local market
                                                    conditions, and your ability
                                                    to manage the property when
                                                    choosing the best type for
                                                    you.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    How do I calculate potential
                                                    ROI on a rental property?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    To calculate ROI (Return on
                                                    Investment) for a rental
                                                    property, subtract your
                                                    annual operating expenses
                                                    and mortgage payments from
                                                    your annual rental income,
                                                    then divide that number by
                                                    your total investment (down
                                                    payment, closing costs, and
                                                    any renovations).
                                                </p>
                                                <p>
                                                    ROI = (Annual Net Income /
                                                    Total Investment) x 100%.
                                                    This helps you compare
                                                    different investment
                                                    opportunities and make
                                                    informed decisions.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Should I invest in
                                                    residential or commercial
                                                    real estate?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Residential real estate is
                                                    often easier for beginners
                                                    due to lower entry costs and
                                                    simpler management.
                                                    Commercial real estate can
                                                    offer higher returns but
                                                    usually requires more
                                                    capital, experience, and
                                                    risk tolerance.
                                                </p>
                                                <p>
                                                    Evaluate your investment
                                                    goals, resources, and risk
                                                    appetite before deciding
                                                    which type of real estate is
                                                    right for you.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What are the tax benefits of
                                                    owning investment
                                                    properties?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Investment property owners
                                                    may benefit from tax
                                                    deductions on mortgage
                                                    interest, property taxes,
                                                    operating expenses,
                                                    depreciation, and repairs.
                                                    These deductions can help
                                                    reduce your taxable income
                                                    and increase your overall
                                                    return.
                                                </p>
                                                <p>
                                                    Consult a tax professional
                                                    to understand which
                                                    deductions apply to your
                                                    situation and to maximize
                                                    your tax benefits.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Is it better to flip houses
                                                    or hold them long-term?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Flipping houses can provide
                                                    quick profits but comes with
                                                    higher risk, more work, and
                                                    potential tax implications.
                                                    Holding properties long-term
                                                    can generate steady rental
                                                    income and benefit from
                                                    property appreciation and
                                                    tax advantages.
                                                </p>
                                                <p>
                                                    The best strategy depends on
                                                    your financial goals, risk
                                                    tolerance, and the local
                                                    real estate market.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="faq-item">
                                <h4 className="mb_15">
                                    Renting &amp; Property Management
                                </h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq2"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-1"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What should I include in a
                                                    rental agreement?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-1"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    A rental agreement should
                                                    clearly outline the terms of
                                                    the lease, including rent
                                                    amount, due date, security
                                                    deposit, lease duration,
                                                    maintenance
                                                    responsibilities, pet
                                                    policies, and rules for
                                                    termination or renewal.
                                                </p>
                                                <p>
                                                    Make sure both landlord and
                                                    tenant understand and agree
                                                    to all terms to avoid future
                                                    disputes.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    How do I screen potential
                                                    tenants effectively?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Effective tenant screening
                                                    includes checking credit
                                                    history, verifying
                                                    employment and income,
                                                    contacting previous
                                                    landlords, and conducting
                                                    background checks. This
                                                    helps ensure you select
                                                    reliable tenants who are
                                                    likely to pay rent on time
                                                    and care for your property.
                                                </p>
                                                <p>
                                                    Always follow fair housing
                                                    laws and obtain written
                                                    consent before running
                                                    background or credit checks.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What are my responsibilities
                                                    as a landlord?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Landlords are responsible
                                                    for maintaining a safe and
                                                    habitable property, making
                                                    necessary repairs, complying
                                                    with local housing laws, and
                                                    respecting tenants’ rights
                                                    to privacy and quiet
                                                    enjoyment.
                                                </p>
                                                <p>
                                                    Clear communication and
                                                    prompt attention to
                                                    maintenance requests help
                                                    foster a positive
                                                    landlord-tenant
                                                    relationship.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    How often should I inspect a
                                                    rental property?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    It’s common to inspect
                                                    rental properties at least
                                                    once or twice a year, in
                                                    addition to move-in and
                                                    move-out inspections.
                                                    Regular inspections help
                                                    identify maintenance issues
                                                    early and ensure the
                                                    property is being cared for
                                                    properly.
                                                </p>
                                                <p>
                                                    Always provide proper notice
                                                    to tenants before entering
                                                    the property, as required by
                                                    law.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    What steps should I take if
                                                    a tenant fails to pay rent?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    If a tenant fails to pay
                                                    rent, communicate promptly
                                                    to understand the situation.
                                                    Provide written notice as
                                                    required by your lease and
                                                    local laws. If payment is
                                                    not received, you may need
                                                    to begin the formal eviction
                                                    process.
                                                </p>
                                                <p>
                                                    Always follow legal
                                                    procedures and consult with
                                                    a local attorney or property
                                                    management professional to
                                                    ensure compliance with
                                                    landlord-tenant laws.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-faq sticky-top">
                                <form
                                    className="form-faq"
                                    action={submitFAQQuestion}
                                >
                                    <div className="heading">
                                        <h5 className="mb_8">
                                            Ask Your Question
                                        </h5>
                                        <p>
                                            Ask Anything, We&apos;re Here to
                                            Help
                                        </p>
                                    </div>
                                    <fieldset>
                                        <label
                                            htmlFor="name"
                                            className="text-button text_primary-color fw-7 mb_8"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className=""
                                            id="name"
                                            type="text"
                                            placeholder="First Name"
                                            name="text"
                                            tabIndex={2}
                                            aria-required="true"
                                            required
                                        />
                                    </fieldset>
                                    <div>
                                        <div className="text-button text_primary-color mb_8">
                                            How Can We Help You?
                                        </div>
                                        {/* Removed the static nice-select dropdown, only use DropdownSelect2 */}
                                        <DropdownSelect2
                                            defaultOption="Investing in Real Estate"
                                            options={[
                                                "Investing in Real Estate",
                                                "Buying a Home",
                                                "Selling a Property",
                                                "Financing Options",
                                                "Other",
                                            ]}
                                        />
                                    </div>
                                    <fieldset>
                                        <label
                                            htmlFor="comment"
                                            className="text-button text_primary-color fw-7 mb_8"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="comment"
                                            className=""
                                            rows={4}
                                            placeholder="Your Message"
                                            tabIndex={2}
                                            aria-required="true"
                                            required
                                        ></textarea>
                                    </fieldset>
                                    <button
                                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                                        type="submit"
                                    >
                                        <span>Send Request</span>
                                        <span className="bg-effect"></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
