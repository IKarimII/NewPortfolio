import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import Reveal from "../Reveal.jsx";
import { SKILLS, OTHER_SKILLS } from "../data/info.js";

const CORNERS = ["tl", "tr", "bl", "br"];

function SkillGroups() {
  const [active, setActive] = useState(0);
  const pills = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(pills.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.035,
      });
    });
    return () => ctx.revert();
  }, [active]);

  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + OTHER_SKILLS.length) % OTHER_SKILLS.length;
    setActive(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-12">
      <div className="skill-tabs" role="tablist" onKeyDown={onKey}>
        {OTHER_SKILLS.map((g, i) => (
          <button
            key={g.group}
            type="button"
            role="tab"
            id={`skill-tab-${i}`}
            aria-selected={active === i}
            aria-controls="skill-panel"
            tabIndex={active === i ? 0 : -1}
            className="skill-tab"
            onClick={() => setActive(i)}
          >
            {g.group}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2" id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} ref={pills}>
        {OTHER_SKILLS[active].items.map((item) => (
          <span key={`${active}-${item}`} className="skill-pill">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const grid = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(grid.current.children, {
        opacity: 0,
        scale: 0.94,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: grid.current, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="skills">
      <Reveal as="h2" className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
        Skills
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" ref={grid}>
        {SKILLS.map((skill) => (
          <div key={skill.name} className="skill-card group">
            <pixel-canvas
              data-gap={skill.pixel.gap}
              data-speed={skill.pixel.speed}
              data-colors={skill.pixel.colors}
              aria-hidden="true"
            />
            {CORNERS.map((c) => (
              <span key={c} className={`skill-corner skill-corner--${c}`} aria-hidden="true">+</span>
            ))}
            <div className="skill-card__inner">
              <div className="skill-bubble">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-icon" aria-hidden="true">
                  <img
                    className={`skill-icon__img${skill.name === "MIPS Assembly" ? " skill-icon__img--mips" : ""}`}
                    src={skill.icon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SkillGroups />
    </div>
  );
}
