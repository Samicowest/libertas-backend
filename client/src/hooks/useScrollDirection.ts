import { useState, useEffect } from "react";

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let timeoutId: NodeJS.Timeout | null = null;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;

            // Ignore very small scrolls
            if (Math.abs(scrollY - lastScrollY) < 5) return;

            const direction = scrollY > lastScrollY ? "down" : "up";
            setScrollDirection(direction);
            setIsScrolling(true);

            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, 100); // 100ms is usually enough for a human "stop"

            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection, { passive: true });
        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return { scrollDirection, isScrolling };
}
