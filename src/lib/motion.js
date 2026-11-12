// Shared motion setup: one GSAP + ScrollTrigger registration, the Lenis
// instance, and helpers every section uses.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

// Freeze / release page scrolling (used while a project is open).
export const lockScroll = () => {
  lenis?.stop();
  document.body.style.overflow = "hidden";
};

export const unlockScroll = () => {
  document.body.style.overflow = "";
  lenis?.start();
};
