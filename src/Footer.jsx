import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./lib/motion.js";

const CONTACTS = [
  {
    label: "GitHub",
    href: "https://github.com/IKarimII",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9613006033",
  },
  {
    label: "Phone",
    href: "tel:+9613006033",
  },
  {
    label: "Email",
    href: "mailto:karimhawwa@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karim-hawwa-166175279/",
  },
];

const BUBBLES = Array.from({ length: 128 }, () => {
  const size = 2 + Math.random() * 4;
  const distance = 6 + Math.random() * 4;
  const position = -5 + Math.random() * 110;
  const time = 2 + Math.random() * 2;
  const delay = -1 * (2 + Math.random() * 2);

  return {
    style: {
      "--size": `${size}rem`,
      "--distance": `${distance}rem`,
      "--position": `${position}%`,
      "--time": `${time}s`,
      "--delay": `${delay}s`,
    },
  };
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".footer__links a"), {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="footer" id="contact" ref={root}>
        <div className="bubbles" aria-hidden>
          {BUBBLES.map((b, i) => (
            <div key={i} className="bubble" style={b.style} />
          ))}
        </div>

        <div className="content">
          <div>
            <div>
              <b className="footer__title">Contact Me</b>
              <div className="footer__links">
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer__copyright">
            <p>© Karim Hawwa {currentYear}</p>
          </div>
        </div>
      </div>

      <svg style={{ position: "fixed", top: "100vh" }} aria-hidden>
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
