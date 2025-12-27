import { useMemo } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contacts = useMemo(
    () => [
      {
        label: "GitHub",
        href: "https://github.com/IKarimII",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/96103006033",
      },
      {
        label: "Phone",
        href: "tel:+96103006033",
      },
      {
        label: "Email",
        href: "mailto:karimhawwa@gmail.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/karim-hawwa-166175279/",
      },
    ],
    []
  );

  const bubbles = useMemo(() => {
    return Array.from({ length: 128 }, () => {
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
  }, []);

  return (
    <>
      <div className="footer" id="contact">
        <div className="bubbles" aria-hidden>
          {bubbles.map((b, i) => (
            <div key={i} className="bubble" style={b.style} />
          ))}
        </div>

        <div className="content">
          <div>
            <div>
              <b className="footer__title">Contact Me</b>
              <div className="footer__links">
                {contacts.map((c) => (
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
