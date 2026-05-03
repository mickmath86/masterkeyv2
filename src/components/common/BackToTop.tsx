"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BackToTop = () => {
  const pathname = usePathname();
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const progressWrap = progressWrapRef.current;
    const progressPath = progressPathRef.current;

    if (!progressWrap || !progressPath) return;

    const pathLength = progressPath.getTotalLength();
    const style = progressPath.style as CSSStyleDeclaration & {
      WebkitTransition?: string;
    };

    style.strokeDasharray = `${pathLength} ${pathLength}`;
    style.strokeDashoffset = `${pathLength}`;

    const updateProgress = () => {
      const scroll = window.scrollY || window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;
      style.strokeDashoffset = `${progress}`;
    };

    const handleScroll = () => {
      if (window.scrollY > 200) {
        progressWrap.classList.add("active-progress");
      } else {
        progressWrap.classList.remove("active-progress");
      }
      updateProgress();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Lần đầu khởi tạo
    updateProgress();

    window.addEventListener("scroll", handleScroll);
    progressWrap.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      progressWrap.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return (
    <div className="progress-wrap" ref={progressWrapRef}>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path ref={progressPathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default BackToTop;
