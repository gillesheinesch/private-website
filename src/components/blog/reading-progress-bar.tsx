"use client";

import { useEffect, useState } from "react";

/** Fixed bar at top of viewport showing scroll progress through the article */
export function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight } = document.documentElement;
            const windowHeight = window.innerHeight;
            const maxScroll = scrollHeight - windowHeight;
            const pct = maxScroll <= 0 ? 1 : Math.min(1, scrollTop / maxScroll);
            setProgress(pct);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed left-0 top-0 z-[60] h-0.5 bg-cyan-500/80 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
            aria-hidden
        />
    );
}
