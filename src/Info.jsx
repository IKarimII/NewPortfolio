import javascriptIcon from "./assets/skills/javascript.svg";
import reactIcon from "./assets/skills/react.svg";
import htmlIcon from "./assets/skills/html.svg";
import cssIcon from "./assets/skills/css.svg";
import pythonIcon from "./assets/skills/python.svg";
import postgresqlIcon from "./assets/skills/postgresql.svg";

export default function Info() {
  const skills = [
    {
      name: "JavaScript",
      icon: javascriptIcon,
      pixel: { gap: 6, speed: 28, colors: "#fef08a,#fde047,#eab308" },
    },
    {
      name: "React",
      icon: reactIcon,
      pixel: { gap: 8, speed: 30, colors: "#e0f2fe,#7dd3fc,#0ea5e9" },
    },
    {
      name: "HTML",
      icon: htmlIcon,
      pixel: { gap: 7, speed: 26, colors: "#fee2e2,#fca5a5,#ef4444" },
    },
    {
      name: "CSS",
      icon: cssIcon,
      pixel: { gap: 7, speed: 26, colors: "#dbeafe,#93c5fd,#3b82f6" },
    },
    {
      name: "Python",
      icon: pythonIcon,
      pixel: { gap: 8, speed: 28, colors: "#dcfce7,#86efac,#22c55e" },
    },
    {
      name: "PostgreSQL",
      icon: postgresqlIcon,
      pixel: { gap: 9, speed: 28, colors: "#e0e7ff,#a5b4fc,#6366f1" },
    },
  ];

  return (
    <>
      <section className="my-info flex justify-center px-6 py-24">
        <div className="w-full max-w-5xl space-y-20 text-left">
          <div className="about-me">
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              About Me
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-white/80 md:text-lg">
              Fully committed to the philosophy of life-long learning, I’m a
              full stack developer with a deep passion for JavaScript, React and
              all things web development. The unique combination of creativity,
              logic, technology and never running out of new things to discover,
              drives my excitement and passion for web development. When I’m not
              at my computer I like to spend my time reading, keeping fit and
              playing guitar.
            </p>
          </div>

          <div className="skills">
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Skills
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-card group">
                  <pixel-canvas
                    data-gap={skill.pixel.gap}
                    data-speed={skill.pixel.speed}
                    data-colors={skill.pixel.colors}
                    aria-hidden="true"
                  />
                  <span
                    className="skill-corner skill-corner--tl"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="skill-corner skill-corner--tr"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="skill-corner skill-corner--bl"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="skill-corner skill-corner--br"
                    aria-hidden="true"
                  >
                    +
                  </span>

                  <div className="skill-card__inner">
                    <div className="skill-bubble" aria-hidden="true">
                      <div
                        className={`skill-name${
                          skill.name === "JavaScript" || skill.name === "HTML"
                            ? " skill-name--big"
                            : ""
                        }`}
                      >
                        {skill.name}
                      </div>
                      <div className="skill-icon" aria-hidden="true">
                        <img
                          className="skill-icon__img"
                          src={skill.icon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
