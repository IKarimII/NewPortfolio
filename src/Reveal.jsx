import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./lib/motion.js";

// Fades its content up the first time it scrolls into view.
// With `stagger`, the direct children animate one after another.
export default function Reveal({
  as = "div",
  delay = 0,
  y = 28,
  stagger = 0,
  children,
  ...rest
}) {
  const Tag = as;
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.from(stagger ? el.children : el, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
