import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import Reveal from "../Reveal.jsx";
import { ABOUT_TEXT, STATS } from "../data/info.js";

const WORDS = ABOUT_TEXT.split(" ");

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-word",
        { opacity: 0.25 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".about-statement",
            start: "top 85%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
      root.current.querySelectorAll(".stat-value").forEach((el) => {
        const end = Number(el.dataset.value);
        const counter = { n: 0 };
        el.textContent = "0";
        gsap.to(counter, {
          n: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      gsap.from(".stat-tile", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".stat-grid", start: "top 90%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-me" ref={root}>
      <Reveal as="h2" className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
        About Me
      </Reveal>
      <p className="about-statement mt-8 text-pretty text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl" aria-label={ABOUT_TEXT}>
        {WORDS.map((word, i) => (
          <span key={i} className="about-word" aria-hidden="true">
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="stat-grid mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-tile">
            <div className="stat-number">
              <span className="stat-value" data-value={s.value}>{s.value}</span>
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
