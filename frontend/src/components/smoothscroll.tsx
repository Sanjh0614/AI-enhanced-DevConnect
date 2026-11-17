import { useEffect } from "react";
import Lenis from "lenis";

function SmoothScroll() {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1,
        });

        let frameId: number;

        function raf(time: number) {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        }

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return null;
}

export default SmoothScroll;