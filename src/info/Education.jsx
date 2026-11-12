import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import Reveal from "../Reveal.jsx";
import { EDUCATION } from "../data/info.js";

export default function Education() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-line__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: ".edu-list", start: "top 75%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray(".edu-entry").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="education" ref={root}>
      <Reveal as="h2" className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
        Education
      </Reveal>
      <div className="edu-list mt-8">
        <div className="edu-line" aria-hidden="true">
          <div className="edu-line__fill" />
        </div>
        {EDUCATION.map((e) => (
          <div key={e.school} className="edu-entry">
            <span className="edu-dot" aria-hidden="true" />
            <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">{e.school}</div>
            <div className="mt-1 text-base text-white/80 md:text-lg">{e.degree}</div>
            <div className="mt-1 text-sm text-white/60">{e.meta}</div>
            {e.notes.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {e.notes.map((n) => (
                  <span key={n} className="edu-pill">{n}</span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
