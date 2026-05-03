"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import Marquee from "react-fast-marquee";
type Direction = "left" | "right" | "up" | "down";

type AutoRepeatMarqueeProps = {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: number;
  direction?: Direction;
  className?: string;
  repeat?: number; // 👈 thêm prop repeat
};

export default function AutoRepeatMarquee({
  children,
  speed = 50,
  pauseOnHover = true,
  gap = 40,
  direction = "left",
  className,
  repeat,
}: AutoRepeatMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(repeat || 1);

  const childrenCount = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    if ((direction === "left" || direction === "right") && !repeat) {
      const updateRepeatCount = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const contentWidth = contentRef.current?.scrollWidth || 0;

        if (containerWidth && contentWidth) {
          const neededRepeat = Math.ceil(containerWidth / contentWidth) + 1;
          setRepeatCount(neededRepeat);
        }
      };

      updateRepeatCount();
      const resizeObserver = new ResizeObserver(updateRepeatCount);
      if (containerRef.current) resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    } else if (repeat) {
      setRepeatCount(repeat);
    }
  }, [childrenCount, direction, repeat]);

  if (direction === "left" || direction === "right") {
    return (
      <div ref={containerRef} className={className}>
        <Marquee
          speed={speed}
          pauseOnHover={pauseOnHover}
          gradient={false}
          direction={direction}
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? contentRef : null}
              style={{ display: "flex", gap }}
            >
              {children}
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  // Custom vertical scrolling for "up" or "down"
  const verticalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    animation: `scroll-${direction} ${10 / (speed / 50)}s linear infinite`,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        height: "100%", // set fixed height
      }}
    >
      <div style={verticalStyle}>
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} style={{ marginBottom: gap }}>
            {children}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
}
