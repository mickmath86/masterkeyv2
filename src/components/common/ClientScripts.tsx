"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Sticky header
const headerFixed2 = () => {
    const header = document.querySelector<HTMLElement>(".header-fixed");
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY >= 10) {
            header.classList.add("is-fixed");
        } else {
            header.classList.remove("is-fixed");
        }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
};

// Animate elements when visible
const animateImgItem = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delayAttr = entry.target.getAttribute("data-delay");
                    const delay = parseFloat(delayAttr ?? "0") || 0;
                    setTimeout(() => {
                        entry.target.classList.add("active-animate");
                    }, delay * 1000);
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll<HTMLElement>(
        ".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
};

// Wishlist toggle
const wishList = () => {
    const wishlistElements = document.querySelectorAll<HTMLElement>(
        ".card-house .wishlist"
    );

    wishlistElements.forEach((el) => {
        el.addEventListener("click", function () {
            this.classList.toggle("addwishlist");

            const icon = this.querySelector<HTMLElement>(".icon");
            const tooltip = this.querySelector<HTMLElement>(".tooltip");

            if (this.classList.contains("addwishlist")) {
                icon?.classList.replace("icon-Heart", "icon-trash-alt-solid");
                if (tooltip) tooltip.textContent = "Remove Wishlist";
            } else {
                icon?.classList.replace("icon-trash-alt-solid", "icon-Heart");
                if (tooltip) tooltip.textContent = "Add to Wishlist";
            }
        });
    });
};

export default function ClientScripts() {
    const pathname = usePathname();

    // Splitting text library
    useEffect(() => {
        import("splitting").then((Splitting) => {
            const splittingElements = document.querySelectorAll(".splitting");
            if (splittingElements.length > 0) {
                Splitting.default();
            }
        });
    }, []);

    // Button hover effect
    useEffect(() => {
        const buttons = document.querySelectorAll(".tf-btn");
        const listeners: (() => void)[] = [];

        buttons.forEach((button) => {
            const btn = button as HTMLElement;
            const buttonWidth = btn.offsetWidth;
            btn.style.setProperty("--button-width", buttonWidth + "px");

            const bgEffect = btn.querySelector(".bg-effect");

            const setPosition = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                const relY = e.clientY - rect.top;
                if (bgEffect) {
                    (bgEffect as HTMLElement).style.top = relY + "px";
                    (bgEffect as HTMLElement).style.left = relX + "px";
                }
            };

            btn.addEventListener("mouseenter", setPosition);
            btn.addEventListener("mouseout", setPosition);

            listeners.push(() => {
                btn.removeEventListener("mouseenter", setPosition);
                btn.removeEventListener("mouseout", setPosition);
            });
        });

        return () => {
            listeners.forEach((cleanup) => cleanup());
        };
    }, [pathname]);

    // GSAP animations
    useGSAP(() => {
        const elements =
            document.querySelectorAll<HTMLElement>(".scrolling-effect");

        elements.forEach((el) => {
            const delayAttr = el.getAttribute("data-delay");
            const delay = delayAttr ? parseFloat(delayAttr) : 0;
            const hasClass = (cls: string) => el.classList.contains(cls);

            const settings: gsap.TweenVars = {
                scrollTrigger: {
                    trigger: el,
                    scrub: 3,
                    toggleActions: "play none none reverse",
                    start: "30px bottom",
                    end: "bottom bottom",
                    once: true,
                },
                duration: 0.8,
                ease: "power3.out",
                delay: delay,
            };

            if (hasClass("effectRight")) settings.x = 80;
            if (hasClass("effectLeft")) settings.x = -80;
            if (hasClass("effectBottom")) settings.y = "20%";
            if (hasClass("effectTop")) settings.y = -80;
            if (hasClass("effectZoomIn")) settings.scale = 0.4;

            if (
                hasClass("effectRight") ||
                hasClass("effectLeft") ||
                hasClass("effectBottom") ||
                hasClass("effectTop") ||
                hasClass("effectZoomIn")
            ) {
                settings.opacity = 0;
            }

            gsap.from(el, settings);
        });

        ScrollTrigger.refresh();
    }, [pathname]);

    // Split text animations
    useGSAP(() => {
        const elements = document.querySelectorAll<HTMLElement>(".split-text");

        elements.forEach((el) => {
            const hasClass = (cls: string) => el.classList.contains(cls);
            const $target = el.querySelector("p, a") ?? el;

            const pxlSplit = new SplitText($target as HTMLElement, {
                type: "words, chars",
                lineThreshold: 0.5,
                linesClass: "split-line",
            });

            let splitTypeSet: HTMLElement[] = Array.from(pxlSplit.chars).filter(
                (c): c is HTMLElement => c instanceof HTMLElement
            );

            gsap.set($target, { perspective: 400 });

            const settings: gsap.TweenVars = {
                scrollTrigger: {
                    trigger: $target,
                    start: "top 86%",
                    once: true,
                },
                duration: 0.9,
                stagger: 0.02,
                ease: "power3.out",
            };

            if (hasClass("effect-fade")) settings.opacity = 0;

            if (
                hasClass("split-lines-transform") ||
                hasClass("split-lines-rotation-x")
            ) {
                pxlSplit.split({
                    type: "lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });
                splitTypeSet = Array.from(pxlSplit.lines).filter(
                    (l): l is HTMLElement => l instanceof HTMLElement
                );
                settings.opacity = 0;
                settings.stagger = 0.5;

                if (hasClass("split-lines-rotation-x")) {
                    settings.rotationX = -120;
                    settings.transformOrigin = "top center -50";
                } else {
                    settings.yPercent = 100;
                    settings.autoAlpha = 0;
                }
            }

            if (hasClass("split-words-scale")) {
                pxlSplit.split({ type: "words" });
                splitTypeSet = Array.from(pxlSplit.words).filter(
                    (w): w is HTMLElement => w instanceof HTMLElement
                );

                splitTypeSet.forEach((elw, index) => {
                    gsap.set(elw, {
                        opacity: 0,
                        scale: index % 2 === 0 ? 0 : 2,
                        force3D: true,
                    });
                });

                gsap.to(splitTypeSet, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 86%",
                        once: true,
                    },
                    scale: 1,
                    rotateX: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.02,
                    ease: "power3.out",
                });

                return;
            }

            if (hasClass("effect-blur-fade")) {
                pxlSplit.split({ type: "words" });
                splitTypeSet = Array.from(pxlSplit.words).filter(
                    (w): w is HTMLElement => w instanceof HTMLElement
                );

                gsap.fromTo(
                    splitTypeSet,
                    {
                        opacity: 0,
                        filter: "blur(10px)",
                        y: 20,
                    },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: $target,
                            start: "top 86%",
                            once: true,
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                return;
            }

            gsap.from(splitTypeSet, settings);
        });

        ScrollTrigger.refresh();
    }, [pathname]);

    // Init animations on mount
    useEffect(() => {
        const cleanupHeader = headerFixed2();
        animateImgItem();
        wishList();

        return () => {
            cleanupHeader?.();
        };
    }, [pathname]);

    return null;
}
