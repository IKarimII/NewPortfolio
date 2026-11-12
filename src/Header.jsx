import { useEffect, useRef } from "react";
import cvPdf from "./assets/Karim's CV.pdf";
import { gsap, prefersReducedMotion } from "./lib/motion.js";

const HEADLINE = "Hello I'm Karim. I'm a Software Engineer";
const WORDS = HEADLINE.split(" ");

export default function Header() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".hero-word");
      const caret = el.querySelector(".caret");
      const buttons = el.querySelector(".hero-buttons");

      gsap.set(caret, { visibility: "hidden" });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(words, { yPercent: 60, opacity: 0, duration: 0.8, stagger: 0.06 })
        .set(caret, { visibility: "visible" }, ">-0.2")
        .from(buttons, { y: 16, opacity: 0, duration: 0.7 }, ">");

      const scroll = { trigger: el, start: "top top", scrub: true };
      gsap.to(el.querySelector(".hero-content"), {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scroll, end: "bottom 15%" },
      });
      gsap.to(el.querySelector(".starfield-wrap"), {
        scale: 1.15,
        ease: "none",
        scrollTrigger: { ...scroll, end: "bottom top" },
      });
      gsap.to(el.querySelector(".scroll-cue"), {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          ...scroll,
          end: "+=160",
          onUpdate: (self) => {
            el.querySelector(".scroll-cue").style.pointerEvents =
              self.progress > 0.5 ? "none" : "";
          },
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="header flex h-screen w-full items-center justify-center overflow-hidden px-6"
    >
        <div className="starfield-wrap" aria-hidden="true">
          <div className="starfield" />
        </div>
        <div className="hero-content mx-auto flex w-full max-w-4xl flex-col items-center">
          <h1
            aria-label={HEADLINE}
            className="text-center text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
          >
            {WORDS.map((w, i) => (
              <span key={i} aria-hidden="true">
                <span className="hero-word">{w}</span>
                {i < WORDS.length - 1 ? " " : null}
              </span>
            ))}
            <span className="caret" aria-hidden="true" />
          </h1>

          <div className="hero-buttons mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              className="hero-btn rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              href={cvPdf}
              download="Karim-Hawwa-CV.pdf"
            >
              Download CV
            </a>
            <a
              className="hero-btn rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5"
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>

        <button
          type="button"
          className="scroll-cue"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="scroll-cue__label">Scroll</span>
          <span className="scroll-cue__line" aria-hidden="true" />
        </button>
    </div>
  );
}
