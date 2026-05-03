import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormComments from "../common/FormComments";
import SideBar2 from "./SideBar2";
import NewsInsight from "./NewsInsight";
import Comment from "../common/Comment";

type BlogItem = {
    imgSrc: string;
    alt: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
    category: string;
    title: string;
    description: string;
};

export default function BlogPost1({ blogItem }: { blogItem: BlogItem }) {
    return (
        <div>
            <div className="thumbs-main-post">
                <div className="thumbs">
                    <Image
                        src={blogItem.imgSrc}
                        width={1920}
                        height={800}
                        alt=""
                    />
                </div>
            </div>

            <div className="main-content">
                <div className="blog-post ">
                    <div className="tf-container tf-spacing-1 ">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="details-post">
                                    <div className="heading-title mb_24">
                                        <div className="tag-heading text-button-small text_primary-color">
                                            {blogItem.category}
                                        </div>
                                        <h3>{blogItem.title}</h3>
                                        <div className="meta-post d-flex align-items-center mb_16">
                                            <div className="item author">
                                                <div className="avatar">
                                                    <Image
                                                        src={
                                                            blogItem.authorAvatar
                                                        }
                                                        width={40}
                                                        height={40}
                                                        alt="avatar"
                                                    />
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="link text_primary-color fw-6 text-title "
                                                >
                                                    {blogItem.authorName}
                                                </Link>
                                            </div>
                                            <div className="item text_primary-color text-title fw-6 d-flex align-items-center gap_8 ">
                                                <i className="icon-CalendarBlank"></i>{" "}
                                                {blogItem.date}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="passive text-body-2">
                                        When evaluating the best states for
                                        rental property investments, there are
                                        several key factors to consider.
                                        Understanding the differences between
                                        each state&apos;s rental market can
                                        significantly impact your
                                        decision-making process, helping you
                                        choose the location that best aligns
                                        with your financial goals, investment
                                        strategy, and property management
                                        preferences.
                                    </p>
                                    <div className="quote">
                                        <p className="h5 mb_11">
                                            &quot;Choosing the right property
                                            isn&apos;t just about
                                            location—it&apos;s about finding a
                                            space that fits your lifestyle,
                                            goals, and future plans.&quot;
                                        </p>
                                        <Link
                                            href="#"
                                            className="text-title fw-6 text_primary-color link name"
                                        >
                                            John Smith
                                        </Link>
                                        <div className="icon">
                                            <i className="icon-quote-line"></i>
                                        </div>
                                    </div>
                                    <p className="passive text-body-2">
                                        From rental demand and vacancy rates to
                                        property taxes, landlord-friendly laws,
                                        and long-term appreciation potential,
                                        each state offers a unique set of
                                        benefits and trade-offs. By carefully
                                        weighing these aspects, you can make a
                                        more informed choice that not only meets
                                        your short-term cash flow goals but also
                                        supports your long-term wealth-building
                                        strategy.
                                    </p>
                                    <div className="wrap-image tf-grid-layout sm-col-2">
                                        <Image
                                            src="/assets/images/blog/thumbs-1.jpg"
                                            width={410}
                                            height={308}
                                            alt="thumbs"
                                        />
                                        <Image
                                            src="/assets/images/blog/thumbs-2.jpg"
                                            width={410}
                                            height={308}
                                            alt="thumbs"
                                        />
                                    </div>
                                    <div className="passive mb_27">
                                        <h5 className="mb_12">
                                            1. Rental Demand And Vacancy Rates
                                        </h5>
                                        <p className="text-body-2">
                                            States with growing populations and
                                            strong job markets typically show
                                            higher rental demand, reducing the
                                            likelihood of long vacancy periods.
                                            Locations like Texas and Florida,
                                            for example, have become
                                            increasingly attractive due to
                                            consistent population growth and
                                            diverse economic activity.
                                        </p>
                                    </div>
                                    <div className="passive mb_40">
                                        <h5 className="mb_12">
                                            2. Cost And ROI Potential
                                        </h5>
                                        <p className="text-body-2">
                                            Some states, particularly in the
                                            Midwest and Southeast, offer lower
                                            property prices and higher rental
                                            yields. States like Ohio or Georgia
                                            may allow you to enter the market at
                                            a lower cost while enjoying solid
                                            monthly returns and manageable
                                            expenses.
                                        </p>
                                    </div>
                                    <div className="passive">
                                        <h5 className="mb_12">Conclusion</h5>
                                        <p className="text-body-2">
                                            Choosing the best state for rental
                                            property investment depends on your
                                            specific goals—whether that’s
                                            maximizing cash flow, minimizing
                                            taxes, or capitalizing on market
                                            growth. Understanding these key
                                            differences across states can help
                                            you make a smarter, more strategic
                                            investment aligned with your
                                            financial objectives.
                                        </p>
                                    </div>
                                    <div className="tag-share d-flex justify-content-between">
                                        <div className="tag d-flex align-items-center gap_12">
                                            <span className="text-button fw-7 text_primary-color">
                                                Tag:
                                            </span>
                                            <ul className="tags-list">
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="tags-item text-caption-1"
                                                    >
                                                        Housing
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="tags-item text-caption-1"
                                                    >
                                                        Investment
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="tags-item text-caption-1"
                                                    >
                                                        Property
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="share d-flex align-items-center gap_16">
                                            <span className="text-button fw-7 text_primary-color">
                                                Share This Post:
                                            </span>
                                            <ul className="tf-social d-flex gap_24">
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="icon-FacebookLogo"
                                                    ></Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="icon-XLogo"
                                                    ></Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="icon-InstagramLogo"
                                                    ></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tf-article-navigation">
                                        <div className="item prev">
                                            <Link
                                                href="single-post-1.html"
                                                className="hover-underline-link text-button text_primary-color fw-7 mb_8"
                                            >
                                                Previous
                                            </Link>
                                            <h5>
                                                <Link
                                                    href="#"
                                                    className="link line-clamp-2"
                                                >
                                                    How To Identify High-Growth
                                                    Neighborhoods In 2025
                                                </Link>
                                            </h5>
                                        </div>
                                        <div className="item next">
                                            <Link
                                                href="single-post-1.html"
                                                className="hover-underline-link text-button text_primary-color fw-7 mb_8"
                                            >
                                                Next
                                            </Link>
                                            <h5>
                                                <Link
                                                    href="#"
                                                    className="link line-clamp-2"
                                                >
                                                    The Future Of Office Spaces
                                                    In A Hybrid Work Era
                                                </Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb_40">
                                    <Comment />
                                </div>
                                <FormComments />
                            </div>
                            <div className="col-lg-4">
                                <SideBar2
                                    authorAvatar={blogItem.authorAvatar}
                                    authorDesc={blogItem.authorDesc}
                                    authorName={blogItem.authorName}
                                    authorFlow={blogItem.authorFlow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <NewsInsight />
            </div>
        </div>
    );
}
