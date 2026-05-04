"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window to the top on every route change.
 * Must live in a client component so it can watch pathname.
 * Placed in the root layout so it fires on every navigation.
 */
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Immediate snap to top — no smooth scroll so GSAP ScrollTrigger
    // doesn't misread the initial scroll position on new pages.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari fallback
  }, [pathname]);

  return null;
}
