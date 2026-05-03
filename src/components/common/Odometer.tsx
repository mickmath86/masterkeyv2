"use client";

import { useEffect, useRef } from "react";
import type Odometer from "odometer";
import "@/styles/odometer.css";

type Props = {
    value: number;
};

export default function OdometerOnScroll({ value }: Props) {
    const odometerRef = useRef<HTMLDivElement>(null);
    const hasAnimatedRef = useRef(false); 

    useEffect(() => {
        let observer: IntersectionObserver;
        let odoInstance: Odometer;

        const loadOdometer = async () => {
            const OdometerClass = (await import("odometer")).default;

            if (!odometerRef.current) return;

            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !hasAnimatedRef.current) {
                        hasAnimatedRef.current = true;

                        odoInstance = new OdometerClass({
                            el: odometerRef.current!,
                            value: 0,
                            format: "(,ddd)",
                            theme: "default",
                            duration: 2000,
                        });

                        setTimeout(() => {
                            odoInstance.update(value);
                        }, 100);

                        observer.disconnect();
                    }
                },
                { threshold: 0.5 }
            );

            observer.observe(odometerRef.current);
        };

        loadOdometer();

        return () => {
            const currentRef = odometerRef.current;
            if (observer && currentRef) observer.disconnect();
        };
    }, [value]);

    return (
        <div className="counter-number">
            <div ref={odometerRef} className="odometer" />
        </div>
    );
}
