import javascriptIcon from "./assets/skills/javascript.svg";
import reactIcon from "./assets/skills/react.svg";
import htmlIcon from "./assets/skills/html.svg";
import cssIcon from "./assets/skills/css.svg";
import pythonIcon from "./assets/skills/python.svg";
import postgresqlIcon from "./assets/skills/postgresql.svg";
import javaIcon from "./assets/skills/java.svg";
import CIcon from "./assets/skills/c.svg";
import mipsIcon from "./assets/skills/mips.svg";
import swiftIcon from "./assets/skills/swift.svg";
import nextIcon from "./assets/skills/nextjs.svg";
import cloudflareIcon from "./assets/skills/cloudflare.svg";

const EXPERIENCE = {
  role: "Software Engineer Intern",
  company: "CME",
  meta: "June – July 2026 · Beirut Digital District, Lebanon",
  points: [
    "Built Khedme, a native iOS app for discovering and booking local service providers, as the iOS engineer on a three-person team alongside Android and web developers.",
    "Implemented map-based provider discovery with MapKit, covering search, filtering, and booking flows.",
    "Developed real-time client–provider messaging using SignalR, backed by an offline-tolerant SwiftData cache for fast cold launches.",
    "Integrated an on-device AI assistant using Apple Foundation Models for natural-language service search.",
    "Structured the codebase around SwiftUI, MVVM, the repository pattern, and dependency injection to keep networking, caching, and presentation layers independently testable.",
  ],
};

const EDUCATION = [
  {
    school: "Lebanese American University",
    degree: "B.S. in Computer Science",
    meta: "October 2024 – Expected June 2027 · Jbeil, Lebanon",
    note: "LAU Honor List · 50% SAT Merit Scholarship",
  },
  {
    school: "SSCC Kfarhbab",
    degree: "French Baccalaureate",
    meta: "2011 – 2024 · Ghazir, Lebanon",
  },
];

const OTHER_SKILLS = [
  {
    group: "Mobile",
    items: ["SwiftUI", "MapKit", "SwiftData", "Foundation Models", "MVVM", "Repository Pattern", "Dependency Injection"],
  },
  {
    group: "Web",
    items: ["Vite", "Zustand", "TailwindCSS", "shadcn/ui", "Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "WebGL"],
  },
  {
    group: "Cloud",
    items: ["Cloudflare Workers", "D1", "Durable Objects", "Cron Triggers", "Wrangler", "Vercel"],
  },
  {
    group: "Data & ML",
    items: ["PyTorch", "Transformers", "DistilBERT", "GloVe", "scikit-learn", "MongoDB", "Redis", "SQLite"],
  },
  {
    group: "Reverse Engineering",
    items: ["Unity IL2CPP / HybridCLR", "Il2CppDumper", "ILSpy", "Binary table decoding", "Asset extraction"],
  },
  {
    group: "Tools",
    items: ["Git", "Xcode", "Postman", "Vitest", "SignalR", "JWT Authentication", "Command Line"],
  },
];

export default function Info() {
  const skills = [
    {
      name: "Swift",
      icon: swiftIcon,
      pixel: { gap: 7, speed: 28, colors: "#ffedd5,#fdba74,#f05138" },
    },
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
      name: "Next.js",
      icon: nextIcon,
      pixel: { gap: 8, speed: 28, colors: "#f5f5f5,#a3a3a3,#525252" },
    },
    {
      name: "Cloudflare",
      icon: cloudflareIcon,
      pixel: { gap: 7, speed: 26, colors: "#ffedd5,#fdba74,#f38020" },
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
    {
      name: "Java",
      icon: javaIcon,
      pixel: { gap: 8, speed: 28, colors: "#fee2e2,#fca5a5,#ef4444" },
    },
    {
      name: "C",
      icon: CIcon,
      pixel: { gap: 7, speed: 26, colors: "#dbeafe,#93c5fd,#3b82f6" },
    },
    {
      name: "MIPS Assembly",
      icon: mipsIcon,
      pixel: { gap: 8, speed: 30, colors: "#e0f2fe,#7dd3fc,#0ea5e9" },
    },
  ];

  return (
    <section className="my-info flex justify-center px-6 py-24">
        <div className="w-full max-w-5xl space-y-20 text-left">
          <div className="about-me">
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              About Me
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-white/80 md:text-lg">
              I’m a computer science student at the Lebanese American
              University and a software engineer who builds for iOS, the web
              and the edge. This year I shipped Khedme, a native iOS app,
              during my internship at CME, and launched Kanstein Almanac, a
              companion platform for the mobile RPG Sword x Staff used by
              players in 60+ countries. The unique combination of creativity,
              logic, technology and never running out of new things to
              discover drives my excitement and passion for development. When
              I’m not at my computer I like to spend my time reading, keeping
              fit and playing the piano.
            </p>
          </div>

          <div className="experience">
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Experience
            </h2>
            <div className="mt-6">
              <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {EXPERIENCE.role} · {EXPERIENCE.company}
              </div>
              <div className="mt-1 text-sm text-white/60">{EXPERIENCE.meta}</div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/80 md:text-lg">
                {EXPERIENCE.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="education">
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Education
            </h2>
            <div className="mt-6 space-y-6">
              {EDUCATION.map((entry) => (
                <div key={entry.school}>
                  <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {entry.school}
                  </div>
                  <div className="mt-1 text-base text-white/80 md:text-lg">
                    {entry.degree}
                  </div>
                  <div className="mt-1 text-sm text-white/60">{entry.meta}</div>
                  {entry.note ? (
                    <div className="mt-1 text-sm text-white/60">
                      {entry.note}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
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
                          className={`skill-icon__img${
                            skill.name === "MIPS Assembly"
                              ? " skill-icon__img--mips"
                              : ""
                          }`}
                          src={skill.icon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-5">
              {OTHER_SKILLS.map(({ group, items }) => (
                <div key={group}>
                  <div className="text-base font-semibold tracking-tight text-white/90 md:text-lg">
                    {group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
