"use client";

import React, { useEffect } from "react";

function slideBarPrivacy() {
    const tocItems = document.querySelectorAll<HTMLElement>(".nav_link");
    const highlightBar = document.querySelector<HTMLElement>(".highlight-bar");
    const privacyTable = document.querySelector<HTMLElement>(".privacy-table");

    if (!highlightBar || tocItems.length === 0) return;

    let activeIndex = 0;

    const updateHighlightBar = (index: number) => {
        const activeItem = tocItems[index];
        if (!activeItem) return;

        const top = activeItem.offsetTop;
        const height = activeItem.offsetHeight;

        highlightBar.style.top = `${top}px`;
        highlightBar.style.height = `${height}px`;
    };

    updateHighlightBar(activeIndex);

    tocItems.forEach((item, index) => {
        item.addEventListener("click", (e: Event) => {
            e.preventDefault();

            tocItems[activeIndex].classList.remove("active");
            item.classList.add("active");
            activeIndex = index;
            updateHighlightBar(index);

            const targetId = item.getAttribute("data-target");
            const targetSection = targetId
                ? document.getElementById(targetId)
                : null;

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });

        item.addEventListener("mouseenter", () => {
            updateHighlightBar(index);
        });
    });

    privacyTable?.addEventListener("mouseleave", () => {
        updateHighlightBar(activeIndex);
    });

    const sectionMap = Array.from(tocItems).map((item) => {
        const targetId = item.getAttribute("data-target");
        const targetSection = targetId
            ? document.getElementById(targetId)
            : null;
        return { item, targetSection };
    });

    const onScroll = () => {
        let newIndex = activeIndex;

        for (let i = 0; i < sectionMap.length; i++) {
            const { targetSection } = sectionMap[i];
            if (!targetSection) continue;

            const rect = targetSection.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== activeIndex) {
            tocItems[activeIndex].classList.remove("active");
            tocItems[newIndex].classList.add("active");
            activeIndex = newIndex;
            updateHighlightBar(activeIndex);
        }
    };

    const onResize = () => {
        updateHighlightBar(activeIndex);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // Cleanup function
    return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
    };
}

export default function Privacy() {
    useEffect(() => {
        const cleanup = slideBarPrivacy();
        return cleanup; 
    }, []);
    return (
        <>
            <div className="tf-spacing-1 section-privacy">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-4">
                            <ul className="privacy-table sticky-top">
                                <li
                                    className="nav_link text-title fw-6 "
                                    data-target="terms"
                                >
                                    <a href="#">1. Terms</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="limitations"
                                >
                                    <a href="#">2. Limitations</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="revisions"
                                >
                                    <a href="#">3. Revisions And Errata</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="modifications"
                                >
                                    <a href="#">
                                        4. Site Terms Of Use Modifications
                                    </a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="risks"
                                >
                                    <a href="#">5. Risks</a>
                                </li>
                                <li className="highlight-bar"></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="content">
                                <h4 className="mb_32 heading-title">
                                    Terms Of Use
                                </h4>
                                <div id="terms">
                                    <h5 className="title mb_12 text-capitalize">
                                        1. Terms{" "}
                                    </h5>
                                    <p className="mb_12">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Integer sed euismod
                                        justo, sit amet efficitur dui. Aliquam
                                        sodales vestibulum velit, eget
                                        sollicitudin quam. Donec non aliquam
                                        eros. Etiam sit amet lectus vel justo
                                        dignissim condimentum.
                                    </p>
                                    <p className="mb_12">
                                        In malesuada neque quis libero laoreet
                                        posuere. In consequat vitae ligula quis
                                        rutrum. Morbi dolor orci, maximus a
                                        pulvinar sed, bibendum ac lacus.
                                        Suspendisse in consectetur lorem.
                                        Pellentesque habitant morbi tristique
                                        senectus et netus et malesuada fames ac
                                        turpis egestas. Aliquam elementum, est
                                        sed interdum cursus, felis ex pharetra
                                        nisi, ut elementum tortor urna eu nulla.
                                        Donec rhoncus in purus quis blandit.
                                    </p>
                                    <p>
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie
                                    </p>
                                </div>
                                <div id="limitations" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        2. Limitations
                                    </h5>
                                    <p className="mb_12">
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie a, finibus
                                        nec ex.
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">
                                            Aliquam elementum, est sed interdum
                                            cursus, felis ex pharetra nisi, ut
                                            elementum tortor urna eu nulla.
                                            Donec rhoncus in purus quis blandit.
                                        </li>
                                        <li className="text-body-default">
                                            Etiam eleifend metus at nunc
                                            ultricies facilisis.
                                        </li>
                                        <li className="text-body-default">
                                            Nullam vel eleifend est, eu posuere
                                            risus. Vestibulum ligula ex,
                                            ullamcorper sit amet molestie a,
                                            finibus nec ex.
                                        </li>
                                    </ul>
                                    <p>
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie
                                    </p>
                                </div>
                                <div id="revisions" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        3. Revisions and errata
                                    </h5>
                                    <p className="mb_12">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Integer sed euismod
                                        justo, sit amet efficitur dui. Aliquam
                                        sodales vestibulum velit, eget
                                        sollicitudin quam. Donec non aliquam
                                        eros. Etiam sit amet lectus vel justo
                                        dignissim condimentum.
                                    </p>
                                    <p className="mb_12">
                                        In malesuada neque quis libero laoreet
                                        posuere. In consequat vitae ligula quis
                                        rutrum. Morbi dolor orci, maximus a
                                        pulvinar sed, bibendum ac lacus.
                                        Suspendisse in consectetur lorem.
                                        Pellentesque habitant morbi tristique
                                        senectus et netus et malesuada fames ac
                                        turpis egestas. Aliquam elementum, est
                                        sed interdum cursus, felis ex pharetra
                                        nisi, ut elementum tortor urna eu nulla.
                                        Donec rhoncus in purus quis
                                    </p>
                                    <p>
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie a, finibus
                                        nec ex.
                                    </p>
                                </div>
                                <div id="modifications" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        4. Site terms of use modifications
                                    </h5>
                                    <p className="mb_12">
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie{" "}
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">
                                            Aliquam elementum, est sed interdum
                                            cursus, felis ex pharetra nisi, ut
                                            elementum tortor urna eu nulla.
                                            Donec rhoncus in purus quis blandit.
                                        </li>
                                        <li className="text-body-default">
                                            Etiam eleifend metus at nunc
                                            ultricies facilisis.
                                        </li>
                                        <li className="text-body-default">
                                            Nullam vel eleifend est, eu posuere
                                            risus. Vestibulum ligula ex,
                                            ullamcorper sit amet molestie a,
                                            finibus nec ex.
                                        </li>
                                    </ul>
                                    <p>
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie{" "}
                                    </p>
                                </div>
                                <div id="risks" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        5. Risks
                                    </h5>
                                    <p className="mb_12">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Integer sed euismod
                                        justo, sit amet efficitur dui. Aliquam
                                        sodales vestibulum velit, eget
                                        sollicitudin quam. Donec non aliquam
                                        eros. Etiam sit amet lectus vel justo
                                        dignissim condimentum.
                                    </p>
                                    <p className="mb_12">
                                        In malesuada neque quis libero laoreet
                                        posuere. In consequat vitae ligula quis
                                        rutrum. Morbi dolor orci, maximus a
                                        pulvinar sed, bibendum ac lacus.
                                        Suspendisse in consectetur lorem.
                                        Pellentesque habitant morbi tristique
                                        senectus et netus et malesuada fames ac
                                        turpis egestas. Aliquam elementum, est
                                        sed interdum cursus, felis ex pharetra
                                        nisi, ut elementum tortor urna eu nulla.
                                        Donec rhoncus in purus quis blandit.
                                    </p>
                                    <p>
                                        Etiam eleifend metus at nunc ultricies
                                        facilisis. Morbi finibus tristique
                                        interdum. Nullam vel eleifend est, eu
                                        posuere risus. Vestibulum ligula ex,
                                        ullamcorper sit amet molestie{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
