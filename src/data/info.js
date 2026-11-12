import javascriptIcon from "../assets/skills/javascript.svg";
import reactIcon from "../assets/skills/react.svg";
import htmlIcon from "../assets/skills/html.svg";
import cssIcon from "../assets/skills/css.svg";
import pythonIcon from "../assets/skills/python.svg";
import postgresqlIcon from "../assets/skills/postgresql.svg";
import javaIcon from "../assets/skills/java.svg";
import CIcon from "../assets/skills/c.svg";
import mipsIcon from "../assets/skills/mips.svg";
import swiftIcon from "../assets/skills/swift.svg";
import nextIcon from "../assets/skills/nextjs.svg";
import cloudflareIcon from "../assets/skills/cloudflare.svg";

export const ABOUT_TEXT =
  "I’m a computer science student at the Lebanese American University and a software engineer who builds for iOS, the web and the edge. This year I shipped Khedme, a native iOS app, during my internship at CME, and launched Kanstein Almanac, a companion platform for the mobile RPG Sword x Staff used by players in 60+ countries. The unique combination of creativity, logic, technology and never running out of new things to discover drives my excitement and passion for development. When I’m not at my computer I like to spend my time reading, keeping fit and playing the piano.";

export const STATS = [
  { value: 60, suffix: "+", label: "countries reached by Kanstein Almanac" },
  { value: 90, suffix: "K+", label: "requests in its first three weeks" },
  { value: 54, suffix: "", label: "releases in three weeks" },
  { value: 3, suffix: "", label: "languages: English, French, Arabic" },
];

export const EXPERIENCE = {
  role: "Software Engineer Intern",
  company: "CME",
  meta: "June – July 2026 · Beirut Digital District, Lebanon",
  points: [
    {
      label: "Khedme",
      text: "Built Khedme, a native iOS app for discovering and booking local service providers, as the iOS engineer on a three-person team alongside Android and web developers.",
    },
    {
      label: "MapKit discovery",
      text: "Implemented map-based provider discovery with MapKit, covering search, filtering, and booking flows.",
    },
    {
      label: "Real-time messaging",
      text: "Developed real-time client–provider messaging using SignalR, backed by an offline-tolerant SwiftData cache for fast cold launches.",
    },
    {
      label: "On-device AI",
      text: "Integrated an on-device AI assistant using Apple Foundation Models for natural-language service search.",
    },
    {
      label: "Architecture",
      text: "Structured the codebase around SwiftUI, MVVM, the repository pattern, and dependency injection to keep networking, caching, and presentation layers independently testable.",
    },
  ],
};

export const EDUCATION = [
  {
    school: "Lebanese American University",
    degree: "B.S. in Computer Science",
    meta: "October 2024 – Expected June 2027 · Jbeil, Lebanon",
    notes: ["LAU Honor List", "50% SAT Merit Scholarship"],
  },
  {
    school: "SSCC Kfarhbab",
    degree: "French Baccalaureate",
    meta: "2011 – 2024 · Ghazir, Lebanon",
    notes: [],
  },
];

export const SKILLS = [
  { name: "Swift", icon: swiftIcon, pixel: { gap: 7, speed: 28, colors: "#ffedd5,#fdba74,#f05138" } },
  { name: "JavaScript", icon: javascriptIcon, pixel: { gap: 6, speed: 28, colors: "#fef08a,#fde047,#eab308" } },
  { name: "React", icon: reactIcon, pixel: { gap: 8, speed: 30, colors: "#e0f2fe,#7dd3fc,#0ea5e9" } },
  { name: "Next.js", icon: nextIcon, pixel: { gap: 8, speed: 28, colors: "#f5f5f5,#a3a3a3,#525252" } },
  { name: "Cloudflare", icon: cloudflareIcon, pixel: { gap: 7, speed: 26, colors: "#ffedd5,#fdba74,#f38020" } },
  { name: "HTML", icon: htmlIcon, pixel: { gap: 7, speed: 26, colors: "#fee2e2,#fca5a5,#ef4444" } },
  { name: "CSS", icon: cssIcon, pixel: { gap: 7, speed: 26, colors: "#dbeafe,#93c5fd,#3b82f6" } },
  { name: "Python", icon: pythonIcon, pixel: { gap: 8, speed: 28, colors: "#dcfce7,#86efac,#22c55e" } },
  { name: "PostgreSQL", icon: postgresqlIcon, pixel: { gap: 9, speed: 28, colors: "#e0e7ff,#a5b4fc,#6366f1" } },
  { name: "Java", icon: javaIcon, pixel: { gap: 8, speed: 28, colors: "#fee2e2,#fca5a5,#ef4444" } },
  { name: "C", icon: CIcon, pixel: { gap: 7, speed: 26, colors: "#dbeafe,#93c5fd,#3b82f6" } },
  { name: "MIPS Assembly", icon: mipsIcon, pixel: { gap: 8, speed: 30, colors: "#e0f2fe,#7dd3fc,#0ea5e9" } },
];

export const OTHER_SKILLS = [
  { group: "Mobile", items: ["SwiftUI", "MapKit", "SwiftData", "Foundation Models", "MVVM", "Repository Pattern", "Dependency Injection"] },
  { group: "Web", items: ["Vite", "Zustand", "TailwindCSS", "shadcn/ui", "Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "WebGL"] },
  { group: "Cloud", items: ["Cloudflare Workers", "D1", "Durable Objects", "Cron Triggers", "Wrangler", "Vercel"] },
  { group: "Data & ML", items: ["PyTorch", "Transformers", "DistilBERT", "GloVe", "scikit-learn", "MongoDB", "Redis", "SQLite"] },
  { group: "Reverse Engineering", items: ["Unity IL2CPP / HybridCLR", "Il2CppDumper", "ILSpy", "Binary table decoding", "Asset extraction"] },
  { group: "Tools", items: ["Git", "Xcode", "Postman", "Vitest", "SignalR", "JWT Authentication", "Command Line"] },
];
