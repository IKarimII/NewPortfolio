import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import { pad } from "./format.js";

const CARD_RADIUS = 24;
const MEDIA_RADIUS = 16;

// A fixed-position copy of the project image that flies between the card and
// the detail frame.
function createClone(rect, src, position, radius) {
  const el = document.createElement("div");
  el.className = "projects-anim-clone";
  Object.assign(el.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: `${radius}px`,
  });
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.style.objectPosition = position;
  el.appendChild(img);
  document.body.appendChild(el);
  return el;
}

const rectVars = (r, radius) => ({
  left: r.left,
  top: r.top,
  width: r.width,
  height: r.height,
  borderRadius: radius,
});

export default function ProjectDetails({
  project,
  index,
  total,
  from,
  getReturnMedia,
  onIndexChange,
  onClosed,
}) {
  const dialogRef = useRef(null);
  const backdropRef = useRef(null);
  const scrollRef = useRef(null);
  const bodyRef = useRef(null);
  const mediaRef = useRef(null);
  const infoRef = useRef(null);
  const closeRef = useRef(null);
  const busyRef = useRef(false);
  const switchingRef = useRef(false);
  const tlRef = useRef(null);
  const cloneRef = useRef(null);
  const [initialFrom] = useState(from);

  const position = project.imagePosition ?? "top";
  const items = () => infoRef.current.querySelectorAll("[data-pd-item]");

  // Opening: backdrop + panel fade in, the image flies from its card into the
  // frame, then the text column staggers in.
  useLayoutEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (prefersReducedMotion()) return;

    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    const media = mediaRef.current;
    const els = items();

    busyRef.current = true;
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(dialog, { opacity: 0 });
    gsap.set(els, { opacity: 0, y: 18 });

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });
    tl.to(backdrop, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
    tl.to(dialog, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0.05);

    let textAt = 0.25;
    if (initialFrom) {
      const toRect = media.getBoundingClientRect();
      media.style.visibility = "hidden";
      const clone = createClone(initialFrom.rect, initialFrom.src, position, CARD_RADIUS);
      cloneRef.current = clone;
      tl.to(clone, { ...rectVars(toRect, MEDIA_RADIUS), duration: 0.85, ease: "power3.inOut" }, 0);
      tl.add(() => {
        media.style.visibility = "";
        clone.remove();
        cloneRef.current = null;
      }, 0.85);
      textAt = 0.75;
    }
    tl.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, textAt);
    tlRef.current = tl;

    return () => {
      tl.kill();
      cloneRef.current?.remove();
      cloneRef.current = null;
      media.style.visibility = "";
      busyRef.current = false;
      gsap.set([backdrop, dialog, els], { clearProps: "opacity,transform" });
    };
    // Runs once per mount; `initialFrom` and `position` never change while open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After a switch: fade the new project in and stagger its text.
  useLayoutEffect(() => {
    if (!switchingRef.current) return;
    switchingRef.current = false;
    scrollRef.current.scrollTop = 0;
    const els = items();
    gsap.set(els, { opacity: 0, y: 12 });
    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });
    tl.to(bodyRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
    tl.to(els, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out" }, 0.05);
    tlRef.current = tl;
  }, [index]);

  const close = () => {
    if (busyRef.current) return;
    busyRef.current = true;

    const target = getReturnMedia(index);
    if (prefersReducedMotion() || !target) {
      onClosed();
      return;
    }

    scrollRef.current.scrollTop = 0;
    const media = mediaRef.current;
    const clone = createClone(
      media.getBoundingClientRect(),
      project.image,
      position,
      MEDIA_RADIUS
    );
    cloneRef.current = clone;
    media.style.visibility = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        clone.remove();
        cloneRef.current = null;
        onClosed();
      },
    });
    tl.to(items(), { opacity: 0, duration: 0.18, ease: "power2.in" }, 0);
    tl.to(dialogRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.1);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);
    tl.to(
      clone,
      { ...rectVars(target.getBoundingClientRect(), CARD_RADIUS), duration: 0.75, ease: "power3.inOut" },
      0.1
    );
    tlRef.current = tl;
  };

  const go = (dir) => {
    if (busyRef.current) return;
    const next = (index + dir + total) % total;
    if (prefersReducedMotion()) {
      onIndexChange(next);
      return;
    }
    busyRef.current = true;
    switchingRef.current = true;
    tlRef.current = gsap.to(bodyRef.current, {
      opacity: 0,
      duration: 0.16,
      ease: "power1.in",
      onComplete: () => onIndexChange(next),
    });
  };

  // Escape / arrows / focus trap. Re-bound each render so it always sees the
  // current project.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        const focusable = dialogRef.current.querySelectorAll("a[href], button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (!dialogRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="pd">
      <div className="pd__backdrop" ref={backdropRef} onClick={close} />

      <div
        className="pd__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
      >
        <button
          type="button"
          className="pd__close"
          ref={closeRef}
          aria-label="Close project"
          onClick={close}
        >
          ×
        </button>

        <div className="pd__scroll" ref={scrollRef} data-lenis-prevent>
          <div className="pd__body" ref={bodyRef}>
            <div className="pd__media-col">
              <div className="pd__media" ref={mediaRef}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ objectPosition: position }}
                  draggable={false}
                />
              </div>
            </div>

            <div className="pd__info" ref={infoRef}>
              <div className="pd__lead">
              <div className="pd__eyebrow" data-pd-item>
                <span>{pad(index)}</span>
                {project.period ? <span>{project.period}</span> : null}
              </div>
              {project.note ? (
                <div className="pd__note" data-pd-item>
                  {project.note}
                </div>
              ) : null}

              <h2 className="pd__name" data-pd-item>
                {project.name}
              </h2>
              <p className="pd__summary" data-pd-item>
                {project.summary}
              </p>

              {project.href ? (
                <a
                  className="pd__link"
                  data-pd-item
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.linkLabel ?? "Visit project"} <span aria-hidden>↗</span>
                </a>
              ) : null}

              {project.stats ? (
                <div className="pd__stats-wrap" data-pd-item>
                  <div
                    className="pd__stats"
                    style={{
                      "--cols": project.stats.length,
                      "--cols-sm": project.stats.length === 4 ? 2 : project.stats.length,
                    }}
                  >
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="pd__stat-value">{stat.value}</div>
                        <div className="pd__stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  {project.statsCaption ? (
                    <div className="pd__stats-caption">{project.statsCaption}</div>
                  ) : null}
                </div>
              ) : null}

              </div>

              <div className="pd__facts">
              <ul className="pd__highlights">
                {project.highlights.map((text) => (
                  <li key={text} data-pd-item>
                    {text}
                  </li>
                ))}
              </ul>

              <ul className="pd__chips" data-pd-item>
                {project.stack.map((item) => (
                  <li key={item} className="projects-chip">
                    {item}
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pd__nav">
          <button type="button" className="pd__nav-btn" onClick={() => go(-1)}>
            <span aria-hidden>←</span> Previous
          </button>
          <span className="pd__count" aria-live="polite">
            {pad(index)} / {pad(total - 1)}
          </span>
          <button type="button" className="pd__nav-btn" onClick={() => go(1)}>
            Next <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
