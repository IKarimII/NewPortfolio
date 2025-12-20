import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import mernMemoriesImg from "./assets/projects/mern-memories.svg";
import nextEventImg from "./assets/projects/next-event.svg";
import devspaceImg from "./assets/projects/devspace.svg";
import googleCloneImg from "./assets/projects/google-clone.svg";
import portfolioV1Img from "./assets/projects/portfolio-v1.svg";
import dresscodeImg from "./assets/projects/dresscode.svg";
import portfolioV2Img from "./assets/projects/portfolio-v2.svg";
import musicAppImg from "./assets/projects/music-app.svg";
import artemisImg from "./assets/projects/artemis.svg";

const PROJECTS = [
  {
    name: "Mern Memories",
    href: "https://github.com/spojskic/mern-memories",
    image: mernMemoriesImg,
  },
  {
    name: "Next Event",
    href: "https://github.com/spojskic/next-dj-events-frontend",
    image: nextEventImg,
  },
  {
    name: "Devspace",
    href: "https://github.com/spojskic/next-devspace-blog",
    image: devspaceImg,
  },
  {
    name: "Google Clone",
    href: "https://github.com/MagicPojska/gulululgl-search-clone",
    image: googleCloneImg,
  },
  {
    name: "Portfolio V1",
    href: "https://safetpojskic.netlify.app/",
    image: portfolioV1Img,
  },
  {
    name: "Dresscode",
    href: null,
    image: dresscodeImg,
  },
  {
    name: "Portfolio V2",
    href: null,
    image: portfolioV2Img,
  },
  {
    name: "Music App",
    href: "https://github.com/spojskic/my-music-app",
    image: musicAppImg,
  },
  {
    name: "Artemis",
    href: null,
    image: artemisImg,
  },
];

export default function Projects() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const cardRefs = useRef([]);
  const detailsOverlayRef = useRef(null);
  const detailsMediaRef = useRef(null);
  const originCardRef = useRef(null);

  const dragPointerIdRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);
  const lastDragAtRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragLastXRef = useRef(0);
  const dragLastTRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const inertiaRafRef = useRef(0);

  const [openIndex, setOpenIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const openIndexRef = useRef(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // Start in the middle so we can wrap seamlessly in both directions.
    const groupWidth = content.scrollWidth / 2;
    if (Number.isFinite(groupWidth) && groupWidth > 0) {
      wrapper.scrollLeft = groupWidth;
    }

    let isAdjusting = false;

    const onScroll = () => {
      if (isAdjusting) return;
      const gw = content.scrollWidth / 2;
      if (!Number.isFinite(gw) || gw <= 0) return;

      const left = wrapper.scrollLeft;

      // Keep scroll position inside the middle copy.
      if (left <= gw * 0.5) {
        isAdjusting = true;
        wrapper.scrollLeft = left + gw;
        isAdjusting = false;
      } else if (left >= gw * 1.5) {
        isAdjusting = true;
        wrapper.scrollLeft = left - gw;
        isAdjusting = false;
      }
    };

    wrapper.addEventListener("scroll", onScroll);

    return () => {
      wrapper.removeEventListener("scroll", onScroll);
    };
  }, []);

  const getSuppressClick = () => {
    // Prevent accidental card opens after a drag gesture.
    return Date.now() - lastDragAtRef.current < 260;
  };

  const stopInertia = () => {
    if (inertiaRafRef.current) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = 0;
    }
  };

  const startInertia = (initialVelocity) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    stopInertia();

    let v = initialVelocity; // px/ms
    let lastT = performance.now();

    const tick = (t) => {
      const dt = t - lastT;
      lastT = t;

      // Exponential decay tuned for a short, smooth glide.
      const decay = Math.pow(0.92, dt / 16);
      v *= decay;

      if (Math.abs(v) < 0.02) {
        inertiaRafRef.current = 0;
        return;
      }

      wrapper.scrollLeft += v * dt;
      inertiaRafRef.current = requestAnimationFrame(tick);
    };

    inertiaRafRef.current = requestAnimationFrame(tick);
  };

  const onWrapperPointerDown = (e) => {
    if (openIndex !== null) return;
    if (e.button !== undefined && e.button !== 0) return;

    // Only drag on empty space; don't steal clicks from cards/interactive elements.
    const target = e.target;
    if (target?.closest?.(".projects-card")) return;
    if (target?.closest?.("button,a,input,textarea,select,[role='button']"))
      return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    stopInertia();

    dragPointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = wrapper.scrollLeft;
    dragLastXRef.current = e.clientX;
    dragLastTRef.current = performance.now();
    dragVelocityRef.current = 0;
    didDragRef.current = false;
    setIsDragging(true);

    try {
      wrapper.setPointerCapture?.(e.pointerId);
    } catch {
      // no-op
    }
  };

  const onWrapperPointerMove = (e) => {
    if (openIndex !== null) return;
    if (dragPointerIdRef.current !== e.pointerId) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const dx = e.clientX - dragStartXRef.current;
    if (!didDragRef.current && Math.abs(dx) > 6) {
      didDragRef.current = true;
    }

    if (didDragRef.current) {
      e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - dragLastTRef.current);
      const deltaX = e.clientX - dragLastXRef.current;
      const vScroll = -(deltaX / dt); // px/ms
      dragVelocityRef.current = dragVelocityRef.current * 0.8 + vScroll * 0.2;
      dragLastXRef.current = e.clientX;
      dragLastTRef.current = now;

      wrapper.scrollLeft = dragStartScrollLeftRef.current - dx;
    }
  };

  const endWrapperDrag = (e) => {
    if (dragPointerIdRef.current !== e.pointerId) return;

    const wrapper = wrapperRef.current;
    if (didDragRef.current) lastDragAtRef.current = Date.now();

    // Momentum after drag.
    if (didDragRef.current && wrapper) {
      // Clamp velocity so it doesn't fling too hard.
      const v = Math.max(-3, Math.min(3, dragVelocityRef.current));
      if (Math.abs(v) >= 0.05) startInertia(v);
    }

    dragPointerIdRef.current = null;
    didDragRef.current = false;
    setIsDragging(false);

    try {
      wrapper?.releasePointerCapture?.(e.pointerId);
    } catch {
      // no-op
    }
  };

  const onWrapperKeyDown = (e) => {
    if (openIndex !== null) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const step = Math.max(260, Math.round(wrapper.clientWidth * 0.6));

    if (e.key === "ArrowRight") {
      e.preventDefault();
      wrapper.scrollBy({ left: step, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      wrapper.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (openIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeProject();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const animateClone = ({ fromRect, toRect, src, onDone }) => {
    const clone = document.createElement("div");
    clone.className = "projects-anim-clone";
    clone.style.left = `${fromRect.left}px`;
    clone.style.top = `${fromRect.top}px`;
    clone.style.width = `${fromRect.width}px`;
    clone.style.height = `${fromRect.height}px`;

    const img = document.createElement("img");
    img.className = "projects-anim-clone__img";
    img.src = src;
    img.alt = "";
    clone.appendChild(img);

    document.body.appendChild(clone);

    const dx = toRect.left - fromRect.left;
    const dy = toRect.top - fromRect.top;
    const sx = toRect.width / fromRect.width;
    const sy = toRect.height / fromRect.height;

    gsap.set(clone, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "0 0",
    });
    gsap.to(clone, {
      x: dx,
      y: dy,
      scaleX: sx,
      scaleY: sy,
      duration: 0.95,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        clone.remove();
        onDone?.();
      },
    });
  };

  const openProject = (index, cardEl) => {
    if (isAnimating || openIndex !== null) return;

    if (!cardEl) {
      setOpenIndex(index);
      return;
    }

    const mediaEl = cardEl.querySelector(".projects-card__media");
    const imgEl = cardEl.querySelector("img");
    if (!mediaEl || !imgEl) {
      setOpenIndex(index);
      return;
    }

    openIndexRef.current = index;
    originCardRef.current = cardEl;

    if (prefersReducedMotion) {
      setOpenIndex(index);
      return;
    }

    setIsAnimating(true);
    const fromRect = mediaEl.getBoundingClientRect();
    const src = imgEl.currentSrc || imgEl.src;

    setOpenIndex(index);

    requestAnimationFrame(() => {
      const toEl = detailsMediaRef.current;
      if (!toEl) {
        setIsAnimating(false);
        return;
      }

      const toRect = toEl.getBoundingClientRect();
      toEl.style.visibility = "hidden";
      animateClone({
        fromRect,
        toRect,
        src,
        onDone: () => {
          toEl.style.visibility = "";
          setIsAnimating(false);
        },
      });
    });
  };

  const closeProject = (mode = "animate") => {
    if (isAnimating || openIndex === null) return;

    if (mode === "fade") {
      const overlayEl = detailsOverlayRef.current;
      const mediaEl = detailsMediaRef.current;
      const topbarEl =
        mediaEl?.querySelector?.(".projects-details__topbar") ?? null;

      if (prefersReducedMotion || !overlayEl || !mediaEl) {
        setOpenIndex(null);
        originCardRef.current = null;
        return;
      }

      setIsAnimating(true);

      gsap.set(overlayEl, { pointerEvents: "none" });
      mediaEl.style.willChange = "transform,opacity";
      if (topbarEl) topbarEl.style.willChange = "opacity";

      const tl = gsap.timeline({
        defaults: { overwrite: true },
        onComplete: () => {
          mediaEl.style.willChange = "";
          if (topbarEl) topbarEl.style.willChange = "";
          gsap.set(overlayEl, { clearProps: "pointer-events" });
          gsap.set(mediaEl, { clearProps: "opacity,transform" });
          if (topbarEl) gsap.set(topbarEl, { clearProps: "opacity" });
          setOpenIndex(null);
          setIsAnimating(false);
          originCardRef.current = null;
        },
      });

      tl.to(
        mediaEl,
        {
          opacity: 0,
          scale: 0.985,
          duration: 0.32,
          ease: "power2.out",
        },
        0
      );

      if (topbarEl) {
        tl.to(
          topbarEl,
          {
            opacity: 0,
            duration: 0.18,
            ease: "power1.out",
          },
          0
        );
      }

      return;
    }

    const index = openIndexRef.current;
    const cardEl = originCardRef.current;
    const toMediaEl = cardEl?.querySelector(".projects-card__media");
    const detailsEl = detailsMediaRef.current;

    if (prefersReducedMotion || !detailsEl || !toMediaEl) {
      setOpenIndex(null);
      return;
    }

    setIsAnimating(true);

    const fromRect = detailsEl.getBoundingClientRect();
    const toRect = toMediaEl.getBoundingClientRect();
    const src = PROJECTS[openIndex]?.image;

    detailsEl.style.visibility = "hidden";
    animateClone({
      fromRect,
      toRect,
      src,
      onDone: () => {
        detailsEl.style.visibility = "";
        setOpenIndex(null);
        setIsAnimating(false);
        originCardRef.current = null;
      },
    });
  };

  return (
    <section className="projects flex justify-center px-6 py-24">
      <div className="w-full max-w-5xl text-left">
        <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
          Projects
        </h2>

        <div
          className={`projects-scroll-wrapper${
            isDragging ? " projects-scroll-wrapper--dragging" : ""
          }`}
          ref={wrapperRef}
          role="region"
          aria-label="Projects gallery"
          tabIndex={0}
          onPointerDown={onWrapperPointerDown}
          onPointerMove={onWrapperPointerMove}
          onPointerUp={endWrapperDrag}
          onPointerCancel={endWrapperDrag}
          onKeyDown={onWrapperKeyDown}
        >
          <div className="projects-scroll-content" ref={contentRef}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="projects-gallery"
                aria-hidden={copy === 1}
              >
                {PROJECTS.map((project, index) => {
                  const oddEvenClass =
                    index % 2 === 0
                      ? "projects-gallery__item projects-gallery__item--odd"
                      : "projects-gallery__item projects-gallery__item--even";

                  return (
                    <div
                      key={`${copy}-${project.name}-${index}`}
                      className={oddEvenClass}
                    >
                      <button
                        type="button"
                        className="projects-card"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (getSuppressClick()) return;
                          openProject(index, e.currentTarget);
                        }}
                        ref={(el) => {
                          if (copy === 0) cardRefs.current[index] = el;
                        }}
                      >
                        <div className="projects-card__media" aria-hidden>
                          <img
                            className="projects-card__img"
                            src={project.image}
                            alt={project.name}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="projects-card__overlay">
                          <div className="projects-card__title">
                            {project.name}
                          </div>
                          <div className="projects-card__meta">Open</div>
                          <div className="projects-card__arrow">+</div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {openIndex !== null ? (
          <div
            className="projects-details"
            role="dialog"
            aria-modal="true"
            ref={detailsOverlayRef}
          >
            <div
              className="projects-details__panel"
              onMouseDown={(e) => {
                // Close ONLY when clicking outside the media.
                // (Buttons are inside the media overlay and stop propagation.)
                if (e.target === e.currentTarget) closeProject("fade");
              }}
            >
              <div
                className="projects-details__media"
                ref={detailsMediaRef}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <img
                  src={PROJECTS[openIndex].image}
                  alt={PROJECTS[openIndex].name}
                />

                <div className="projects-details__topbar">
                  <div className="projects-details__title">
                    {PROJECTS[openIndex].name}
                  </div>

                  <div className="projects-details__actions">
                    {PROJECTS[openIndex].href ? (
                      <a
                        className="projects-details__link"
                        href={PROJECTS[openIndex].href}
                        target="_blank"
                        rel="noreferrer"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open link ↗
                      </a>
                    ) : (
                      <div className="projects-details__nolink">No link</div>
                    )}

                    <button
                      type="button"
                      className="projects-details__close"
                      aria-label="Close"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeProject("animate");
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
