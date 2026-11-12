import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import Reveal from "../Reveal.jsx";
import { EXPERIENCE } from "../data/info.js";

const { role, company, meta, points } = EXPERIENCE;

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function Tabs() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const [marker, setMarker] = useState({ y: 0, height: 0 });

  // Slide the one marker to the active tab; CSS transitions do the motion,
  // so quick changes continue from wherever the bar currently is.
  useLayoutEffect(() => {
    const btn = listRef.current.children[active + 1];
    setMarker({ y: btn.offsetTop, height: btn.offsetHeight });
  }, [active]);

  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + points.length) % points.length;
    setActive(next);
    listRef.current.children[next + 1].focus();
  };

  return (
    <div className="exp-grid">
      <div>
        <div className="exp-role">{role} · {company}</div>
        <div className="exp-meta">{meta}</div>
        <div className="exp-tabs" role="tablist" aria-orientation="vertical" ref={listRef} onKeyDown={onKey}>
          <span
            className="exp-marker"
            aria-hidden="true"
            style={{ transform: `translateY(${marker.y}px)`, height: marker.height }}
          />
          {points.map((p, i) => (
            <button
              key={p.label}
              type="button"
              role="tab"
              id={`exp-tab-${i}`}
              aria-selected={active === i}
              aria-controls="exp-panel"
              tabIndex={active === i ? 0 : -1}
              className="exp-tab"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="exp-panel" id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${active}`}>
        <div className="exp-index" aria-hidden="true">{String(active + 1).padStart(2, "0")}</div>
        <p key={active} className="exp-text">{points[active].text}</p>
      </div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState(0);
  const bodies = useRef([]);

  useEffect(() => {
    bodies.current.forEach((el, i) => {
      if (!el) return;
      const h = open === i ? "auto" : 0;
      if (prefersReducedMotion()) gsap.set(el, { height: h });
      else gsap.to(el, { height: h, duration: 0.5, ease: "power3.inOut" });
    });
  }, [open]);

  return (
    <div>
      <div className="exp-role">{role} · {company}</div>
      <div className="exp-meta">{meta}</div>
      <div className="exp-acc">
        {points.map((p, i) => (
          <div key={p.label} className="exp-acc__item">
            <button
              type="button"
              id={`exp-acc-${i}`}
              className="exp-acc__btn"
              aria-expanded={open === i}
              aria-controls={`exp-acc-panel-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span>{p.label}</span>
              <span className="exp-acc__icon" aria-hidden="true">{open === i ? "−" : "+"}</span>
            </button>
            <div
              className="exp-acc__body"
              id={`exp-acc-panel-${i}`}
              role="region"
              aria-labelledby={`exp-acc-${i}`}
              ref={(el) => {
                bodies.current[i] = el;
              }}
              style={{ height: i === 0 ? "auto" : 0 }}
            >
              <p>{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const mobile = useIsMobile();
  return (
    <div className="experience">
      <Reveal as="h2" className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
        Experience
      </Reveal>
      <Reveal className="mt-8" delay={0.1}>
        {mobile ? <Accordion /> : <Tabs />}
      </Reveal>
    </div>
  );
}
