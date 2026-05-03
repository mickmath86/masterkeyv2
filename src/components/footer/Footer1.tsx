"use client";
import { footerSections } from "@/data/footer";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { subscribeNewsletter } from "@/actions/newsletterAction";

// Accordion logic unchanged
const handleFooter = (): void => {
    const DURATION = 250;
    let isMobile = window.matchMedia(
        "only screen and (max-width: 767px)"
    ).matches;

    const footerHeadings = document.querySelectorAll<HTMLElement>(
        ".footer-heading-mobile"
    );

    const slideUp = (element: HTMLElement, duration: number): void => {
        element.style.transition = `height ${duration}ms ease`;
        element.style.overflow = "hidden";
        element.style.height = element.scrollHeight + "px";

        requestAnimationFrame(() => {
            element.style.height = "0";
        });

        setTimeout(() => {
            element.style.display = "none";
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const slideDown = (element: HTMLElement, duration: number): void => {
        element.style.removeProperty("display");
        const display = getComputedStyle(element).display;
        if (display === "none") element.style.display = "block";

        const height = element.scrollHeight;
        element.style.height = "0";
        element.style.overflow = "hidden";
        element.style.transition = `height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.height = height + "px";
        });

        setTimeout(() => {
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const toggleHandler = (heading: HTMLElement): void => {
        const parent = heading.closest(".footer-col-block");
        const content = heading.nextElementSibling as HTMLElement | null;

        if (!parent || !content) return;

        const isOpen = parent.classList.toggle("open");
        if (isOpen) {
            slideDown(content, DURATION);
        } else {
            slideUp(content, DURATION);
        }
    };

    const initAccordion = () => {
        footerHeadings.forEach((heading) => {
            if (!heading.dataset.listenerAttached) {
                heading.addEventListener("click", () => toggleHandler(heading));
                heading.dataset.listenerAttached = "true";
            }
        });
    };

    const updateAccordion = () => {
        const currentlyMobile = window.matchMedia(
            "only screen and (max-width: 767px)"
        ).matches;

        if (currentlyMobile !== isMobile) {
            isMobile = currentlyMobile;

            footerHeadings.forEach((heading) => {
                const parent = heading.closest(".footer-col-block");
                const content =
                    heading.nextElementSibling as HTMLElement | null;

                if (!parent || !content) return;

                if (isMobile) {
                    content.style.display = parent?.classList.contains("open")
                        ? "block"
                        : "none";
                } else {
                    parent.classList.remove("open");
                    content.style.display = "block";
                    content.removeAttribute("style");
                }
            });
        }
    };

    initAccordion();
    updateAccordion();

    window.addEventListener("resize", updateAccordion);
};

export default function Footer1() {
    const pathname = usePathname();
    useEffect(() => {
        handleFooter();
        return () => {
            window.removeEventListener("resize", handleFooter);
        };
    }, [pathname]);

    const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        // Call the server action
        await subscribeNewsletter(formData);
    };

    return (
        <footer className="footer">
            <div className="tf-container ">
                <div className="footer-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about footer-item">
                                <Link href="/" className="footer-logo mb_17">
                                    <Image
                                        src="/assets/images/logo/logo-2.png"
                                        alt="logo"
                                        className="main-logo"
                                        width={222}
                                        height={48}
                                    />
                                </Link>
                                <div className="mb_16">
                                    <p className="mb_4 text_color-1">
                                        Our Address:
                                    </p>
                                    <p className="text_white">
                                        101 E 129th St, East Chicago, 2nd Floor
                                        New York, NY 10017
                                    </p>
                                </div>
                                <div className="text-body-default text_secondary-color mb_16">
                                    <span className="text_color-1">
                                        Support 24/7:{" "}
                                    </span>
                                    <span className="text_white ms_4">
                                        1-555-678-8888
                                    </span>
                                </div>
                                <div className="text-body-default text_secondary-color">
                                    <span className="text_color-1">
                                        Email Address:{" "}
                                    </span>
                                    <Link
                                        href="mailto:themesflat@gmail.com"
                                        className="text_white link ms_4"
                                    >
                                        themesflat@gmail.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-content footer-item d-flex justify-content-between">
                                {footerSections.map((section) => (
                                    <div
                                        key={section.className}
                                        className={`footer-col-block ${section.className}`}
                                    >
                                        <div className="footer-heading  footer-heading-mobile text-title fw-6 text_white mb_16">
                                            {section.heading}
                                        </div>
                                        <div className="tf-collapse-content">
                                            <ul className="footer-menu-list d-grid gap_12">
                                                {section.links.map((link) => (
                                                    <li
                                                        key={
                                                            link.href +
                                                            link.label
                                                        }
                                                        className="text-body-default text_color-1"
                                                    >
                                                        <Link
                                                            href={link.href}
                                                            className="link"
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footer-newsletter footer-item">
                                <div className="footer-heading text-title fw-6 text_white mb_16">
                                    Join Our Newsletter
                                </div>
                                <p className="text_color-1 mb_20">
                                    Sign up for updates on our latest news.
                                </p>
                                <form
                                    id="subscribe-form"
                                    acceptCharset="utf-8"
                                    data-mailchimp="true"
                                    className="form-newsletter style-1 mb_20"
                                    onSubmit={handleNewsletterSubmit}
                                >
                                    <div
                                        id="subscribe-content"
                                        className="position-relative"
                                    >
                                        <fieldset className="fieldset-item">
                                            <input
                                                type="email"
                                                placeholder="E-mail"
                                                id="subscribe-email"
                                                name="email"
                                                aria-required="true"
                                                required
                                            />
                                        </fieldset>
                                        <button
                                            id="subscribe-button"
                                            type="submit"
                                            className="button-submit animate-hover-btn "
                                        >
                                            <span className="icon-ArrowUpRight"></span>
                                        </button>
                                    </div>
                                    <div id="subscribe-msg"></div>
                                </form>
                                <p className="text_color-1">
                                    By clicking subscribe, you agree to the
                                    <Link
                                        href="#"
                                        className="hover-underline-link link"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    {"  "}
                                    and
                                    {"  "}
                                    <Link
                                        href={"/privacy-policy"}
                                        className="hover-underline-link link"
                                    >
                                        Privacy Policy.
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom d-flex align-items-center justify-content-between">
                    <p className="text_muted-color">
                        ©2025 {"  "}
                        <Link
                            href="#"
                            className="text_white hover-underline-link"
                        >
                            Luminor.
                        </Link>{" "}
                        {"  "}
                        All Rights Reserved.
                    </p>
                    <ul className="social d-flex gap_24">
                        <li>
                            <Link href="#" className="icon-FacebookLogo"></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-XLogo"></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-TiktokLogo"></Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="icon-InstagramLogo"
                            ></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-YoutubeLogo"></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
