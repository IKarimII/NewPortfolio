import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";

const DRAG_THRESHOLD = 6; // px before a press counts as a drag
const CLICK_SUPPRESS_MS = 260;

// Horizontal gallery behaviour: pointer drag with inertia, seamless
// wrap-around over two identical copies, keyboard arrows and a smooth
// "scroll by one card" helper.
//
// The scroller needs `contentRef` on an element whose first two children are
// the two copies, and each copy's children are the cards.
export default function useDragScroll({ enabled = true, getInset } = {}) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const enabledRef = useRef(enabled);
  const insetRef = useRef(getInset);
  const dragRef = useRef({ id: null, lastX: 0, lastT: 0, v: 0, moved: false });
  const lastDragAtRef = useRef(0);
  const inertiaRef = useRef(0);
  const tweenRef = useRef(null);
  const carryRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    enabledRef.current = enabled;
    insetRef.current = getInset;
  });

  // Distance (px) between the same card in copy 0 and copy 1.
  const getPeriod = useCallback(() => {
    const [a, b] = contentRef.current?.children ?? [];
    if (!a || !b) return 0;
    return b.getBoundingClientRect().left - a.getBoundingClientRect().left;
  }, []);

  // Distance between neighbouring cards.
  const getStride = useCallback(() => {
    const cards = contentRef.current?.children[0]?.children;
    if (!cards || cards.length < 2) return 320;
    return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
  }, []);

  // Scroll by whole pixels, carrying the fraction (scrollLeft is rounded).
  const nudge = useCallback((dx) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    carryRef.current += dx;
    const whole = Math.trunc(carryRef.current);
    if (!whole) return;
    carryRef.current -= whole;
    wrapper.scrollLeft += whole;
  }, []);

  const stopMotion = useCallback(() => {
    cancelAnimationFrame(inertiaRef.current);
    inertiaRef.current = 0;
    tweenRef.current?.kill();
    tweenRef.current = null;
  }, []);

  // Start in the middle copy and keep the scroll position inside it.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let period = getPeriod();
    if (period > 0) {
      wrapper.scrollLeft = period - (insetRef.current?.() ?? 0);
    }

    const onScroll = () => {
      const p = getPeriod();
      if (p <= 0) return;
      const left = wrapper.scrollLeft;
      if (left < p * 0.5) wrapper.scrollLeft = left + p;
      else if (left >= p * 1.5) wrapper.scrollLeft = left - p;
    };

    const onResize = () => {
      const next = getPeriod();
      if (next <= 0 || period <= 0) return;
      const phase = (((wrapper.scrollLeft % period) + period) % period) / period;
      period = next;
      wrapper.scrollLeft = next * (1 + phase);
    };

    wrapper.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      wrapper.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [getPeriod]);

  useEffect(() => stopMotion, [stopMotion]);

  const startInertia = useCallback(
    (initialVelocity) => {
      let v = initialVelocity; // px/ms
      let lastT = performance.now();
      const tick = (t) => {
        const dt = t - lastT;
        lastT = t;
        v *= Math.pow(0.92, dt / 16);
        if (Math.abs(v) < 0.02) {
          inertiaRef.current = 0;
          return;
        }
        nudge(v * dt);
        inertiaRef.current = requestAnimationFrame(tick);
      };
      inertiaRef.current = requestAnimationFrame(tick);
    },
    [nudge]
  );

  const onPointerDown = (e) => {
    if (!enabledRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopMotion();
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId || !enabledRef.current) return;
    const wrapper = wrapperRef.current;

    if (!d.moved) {
      if (Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD) return;
      d.moved = true;
      setIsDragging(true);
      try {
        wrapper.setPointerCapture(e.pointerId);
      } catch {
        // pointer already gone
      }
    }

    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    const dx = e.clientX - d.lastX;
    d.v = d.v * 0.8 + -(dx / dt) * 0.2;
    d.lastX = e.clientX;
    d.lastT = now;
    nudge(-dx);
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId) return;
    dragRef.current = { id: null, lastX: 0, lastT: 0, v: 0, moved: false };

    if (d.moved) {
      lastDragAtRef.current = Date.now();
      const v = Math.max(-3, Math.min(3, d.v));
      if (Math.abs(v) >= 0.05) startInertia(v);
      try {
        wrapperRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // already released
      }
      setIsDragging(false);
    }
  };

  // Prevents a card opening right after a drag gesture.
  const shouldSuppressClick = () => Date.now() - lastDragAtRef.current < CLICK_SUPPRESS_MS;

  // Smoothly scroll the gallery by one card in the given direction (-1 / 1).
  const scrollByCard = useCallback(
    (dir) => {
      stopMotion();
      const distance = dir * getStride();
      if (prefersReducedMotion()) {
        nudge(distance);
        return;
      }
      const state = { p: 0 };
      let prev = 0;
      tweenRef.current = gsap.to(state, {
        p: distance,
        duration: 0.75,
        ease: "power3.out",
        onUpdate: () => {
          nudge(state.p - prev);
          prev = state.p;
        },
      });
    },
    [getStride, nudge, stopMotion]
  );

  // Instantly bring a card to the middle of the gallery.
  const centerOn = useCallback(
    (el) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !el) return;
      stopMotion();
      const w = wrapper.getBoundingClientRect();
      const c = el.getBoundingClientRect();
      nudge(c.left + c.width / 2 - (w.left + w.width / 2));
    },
    [nudge, stopMotion]
  );

  const onKeyDown = (e) => {
    if (!enabledRef.current) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return {
    wrapperRef,
    contentRef,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onKeyDown,
    },
    shouldSuppressClick,
    scrollByCard,
    centerOn,
  };
}
