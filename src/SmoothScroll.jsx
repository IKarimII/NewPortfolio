import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, setLenis } from "./lib/motion.js";

// Smooth wheel scrolling for the whole page, kept in sync with ScrollTrigger.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // In-page links glide to their target instead of jumping.
    const onClick = (event) => {
      const href = event.target.closest("a[href^='#']")?.getAttribute("href");
      const target = href && href.length > 1 && document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(update);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
