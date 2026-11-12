import { useEffect, useRef, useState } from "react";
import { gsap, lockScroll, prefersReducedMotion, unlockScroll } from "./lib/motion.js";
import Reveal from "./Reveal.jsx";
import { PROJECTS } from "./data/projects.js";
import ProjectCard from "./projects/ProjectCard.jsx";
import ProjectDetails from "./projects/ProjectDetails.jsx";
import useDragScroll from "./projects/useDragScroll.js";

export default function Projects() {
  const headRef = useRef(null);
  const originRef = useRef(null);
  const [open, setOpen] = useState(null); // { index, from } while a project is open

  const {
    wrapperRef,
    contentRef,
    isDragging,
    handlers,
    shouldSuppressClick,
    scrollByCard,
    centerOn,
  } = useDragScroll({
    enabled: open === null,
    // Line the first card up with the heading.
    getInset: () => {
      const head = headRef.current;
      return head.getBoundingClientRect().left + parseFloat(getComputedStyle(head).paddingLeft);
    },
  });

  // Cards fade/slide in once, when the gallery scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = wrapperRef.current;
    const view = wrapper.getBoundingClientRect();
    const cards = [...wrapper.querySelectorAll(".projects-card")].filter((card) => {
      const r = card.getBoundingClientRect();
      return r.right > view.left && r.left < view.right;
    });
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: wrapper, start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, [wrapperRef]);

  // Never leave the page locked if we unmount while open.
  useEffect(() => unlockScroll, []);

  // The copy of a project's card currently nearest the middle of the gallery.
  const findCard = (index) => {
    const wrapper = wrapperRef.current;
    const view = wrapper.getBoundingClientRect();
    const middle = view.left + view.width / 2;
    let best = null;
    let bestDistance = Infinity;
    wrapper.querySelectorAll(`[data-project-index="${index}"]`).forEach((card) => {
      const r = card.getBoundingClientRect();
      const distance = Math.abs(r.left + r.width / 2 - middle);
      if (distance < bestDistance) {
        best = card;
        bestDistance = distance;
      }
    });
    return best;
  };

  const openProject = (index, card) => {
    if (open) return;
    lockScroll(); // before measuring: removing the scrollbar can shift the layout
    originRef.current = card;
    const media = card.querySelector(".projects-card__media");
    const img = card.querySelector("img");
    setOpen({
      index,
      from: { rect: media.getBoundingClientRect(), src: img.currentSrc || img.src },
    });
  };

  const switchProject = (index) => {
    const card = findCard(index);
    centerOn(card);
    originRef.current = card;
    setOpen((prev) => ({ ...prev, index }));
  };

  const getReturnMedia = (index) => {
    const card = findCard(index);
    originRef.current = card;
    return card?.querySelector(".projects-card__media") ?? null;
  };

  const closeProject = () => {
    unlockScroll();
    originRef.current?.focus({ preventScroll: true });
    setOpen(null);
  };

  return (
    <section className="projects pt-24 pb-32">
      <div ref={headRef} className="mx-auto w-full max-w-5xl px-6 text-left">
        <Reveal as="h2" className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
          Projects
        </Reveal>

        <Reveal className="projects-controls" delay={0.1}>
          <p className="projects-controls__hint">Drag or use the arrow keys to explore</p>
          <div className="projects-controls__buttons">
            <button
              type="button"
              className="projects-arrow"
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="projects-arrow"
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
            >
              →
            </button>
          </div>
        </Reveal>
      </div>

      <div
        className={`projects-scroll-wrapper${isDragging ? " projects-scroll-wrapper--dragging" : ""}`}
        ref={wrapperRef}
        role="region"
        aria-label="Projects gallery"
        tabIndex={0}
        {...handlers}
      >
        <div className="projects-scroll-content" ref={contentRef}>
          {[0, 1].map((copy) => (
            <div key={copy} className="projects-gallery" aria-hidden={copy === 0}>
              {PROJECTS.map((project, index) => (
                <div
                  key={project.name}
                  className={`projects-gallery__item projects-gallery__item--${
                    index % 2 === 0 ? "odd" : "even"
                  }`}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    tabbable={copy === 1}
                    onOpen={(i, card) => {
                      if (!shouldSuppressClick()) openProject(i, card);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {open ? (
        <ProjectDetails
          project={PROJECTS[open.index]}
          index={open.index}
          total={PROJECTS.length}
          from={open.from}
          getReturnMedia={getReturnMedia}
          onIndexChange={switchProject}
          onClosed={closeProject}
        />
      ) : null}
    </section>
  );
}
