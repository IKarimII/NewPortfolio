import kansteinHome from "./assets/work/kanstein-home.webp";
import kansteinMap from "./assets/work/kanstein-map.webp";
import kansteinSimulator from "./assets/work/kanstein-simulator.webp";
import shipit from "./assets/work/shipit.webp";

export const profile = {
  name: "Karim Hawwa",
  email: "karimhawwa@gmail.com",
  cv: "/Karim-Hawwa-CV.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/IKarimII" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/karim-hawwa-166175279/",
    },
    { label: "WhatsApp", href: "https://wa.me/9613006033" },
  ],
  facts: [
    { label: "Studying", value: "B.S. Computer Science, LAU, class of 2027" },
    { label: "Based in", value: "Lebanon" },
    { label: "Latest", value: "Kanstein Almanac, live since October 2026" },
    { label: "Speaks", value: "English, French, Arabic" },
  ],
};

export const featured = {
  name: "Kanstein Almanac",
  href: "https://kanstein.xyz",
  linkLabel: "kanstein.xyz",
  period: "Oct 2026 – Present",
  note: "In collaboration with Boltray Games",
  summary:
    "A companion platform for the mobile RPG Sword x Staff, built with the game's studio and its official art: character planner, gacha simulator, interactive map, wiki and a live server calendar.",
  stats: [
    { value: "90K+", label: "requests" },
    { value: "9K+", label: "page views" },
    { value: "60+", label: "countries" },
    { value: "54", label: "releases" },
  ],
  statsNote: "First three weeks after launch",
  points: [
    "Reverse-engineered the game's Unity client (IL2CPP / HybridCLR assemblies, Luban config tables, Spine rigs) and wrote a 70-script Python toolchain that turns raw game data into typed, versioned datasets.",
    "Serverless backend on Cloudflare Workers and D1: email-verified accounts, PBKDF2 password hashing, session auth, public profiles and cron-scheduled cleanup.",
    "Real-time chat over WebSockets on Durable Objects with the hibernation API, one hub per channel for public rooms, private messages, friends and media sharing.",
    "Animated, customizable characters rendered in the browser with Spine WebGL, backed by 65 Vitest suites and prerendered pages for SEO.",
  ],
  stack: [
    "React 19",
    "Vite",
    "Zustand",
    "Cloudflare Workers",
    "D1",
    "Durable Objects",
    "WebSockets",
    "WebGL",
    "Python",
  ],
  images: [
    { src: kansteinHome, alt: "Kanstein Almanac home page with the season timeline" },
    { src: kansteinMap, alt: "Interactive world map in Kanstein Almanac" },
    { src: kansteinSimulator, alt: "Prayer simulator in Kanstein Almanac" },
  ],
};

export const projects = [
  {
    name: "ShipIt",
    href: "https://shipit-dusky-one.vercel.app/",
    linkLabel: "Live demo",
    period: "2026",
    summary:
      "An AI-powered, multi-tenant e-commerce platform that lets merchants generate and manage online stores without writing code. Co-built as a team project.",
    points: [
      "OpenAI and Groq turn natural-language prompts into editable storefront configuration and branding.",
      "Visual store editor with drag-and-drop sections and live preview.",
      "Express and MongoDB backend with JWT auth, role-based access control and Redis rate limiting.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "React 19", "Zustand", "TailwindCSS", "OpenAI", "Groq", "Redis"],
    image: { src: shipit, alt: "ShipIt landing page" },
  },
  {
    name: "TechFinder",
    href: "https://techfinderlb.space",
    linkLabel: "techfinderlb.space",
    period: "2026",
    summary:
      "A price comparison platform for tech products across Lebanese retailers, with VAT-inclusive pricing normalised so every product is compared on the same terms.",
    points: [
      "FastAPI backend on async SQLAlchemy 2.0 and PostgreSQL, with an append-only price history that records a row only when a price moves.",
      "Ingestion adapters for WooCommerce, Shopify and JSON-LD storefronts.",
      "Server-rendered Next.js frontend on Cloudflare with structured data and a sitemap.",
    ],
    stack: ["Next.js", "React", "TailwindCSS", "FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "Python"],
    image: null,
  },
];

export const moreProjects = [
  {
    name: "Classifying Participant Roles in Conversational Text",
    tag: "Research paper",
    summary:
      "Co-authored a paper classifying discussion participants as learner, teacher or troll on a balanced 15,000-sample dataset. A fine-tuned DistilBERT reached a 0.99 F1-score against TF-IDF and TextCNN baselines, with error analysis of cross-corpus domain shift.",
    stack: ["PyTorch", "Transformers", "DistilBERT", "GloVe", "TF-IDF"],
  },
  {
    name: "MessageBoard",
    tag: "Full-stack",
    href: "https://github.com/IKarimII/TheMessageBoard",
    summary:
      "Message board with JWT authentication in HTTP-only cookies, protected routes, email verification and password reset through Resend, and Redis rate limiting.",
    stack: ["Node.js", "Express", "MongoDB", "React", "TailwindCSS"],
  },
  {
    name: "AICodeReviewer",
    tag: "AI tooling",
    href: "https://github.com/IKarimII/AICodeReviewer",
    summary:
      "Code review tool that returns structured feedback, with validated JSON parsing and a graceful fallback when the model output is malformed.",
    stack: ["Express", "React", "Vite", "OpenRouter"],
  },
  {
    name: "DodgyCube",
    tag: "Assembly game",
    href: "https://github.com/IKarimII/DodgeyCube",
    summary:
      "Arcade-style dodge-and-collect game written entirely in assembly, with a hand-written bitmap renderer, collision detection, and health and score systems.",
    stack: ["MIPS Assembly", "MARS Bitmap Display"],
  },
];

export const experience = {
  company: "CME",
  role: "Software Engineer Intern",
  period: "June – July 2026",
  place: "Beirut Digital District, Lebanon",
  summary:
    "Built Khedme, a native iOS app for discovering and booking local service providers, as the iOS engineer on a three-person team alongside Android and web developers.",
  points: [
    "Map-based provider discovery with MapKit, covering search, filtering and booking flows.",
    "Real-time client–provider messaging over SignalR, backed by an offline-tolerant SwiftData cache for fast cold launches.",
    "On-device AI assistant using Apple Foundation Models for natural-language service search.",
    "SwiftUI, MVVM, the repository pattern and dependency injection keep networking, caching and presentation independently testable.",
  ],
  stack: ["Swift", "SwiftUI", "MapKit", "SwiftData", "SignalR", "Foundation Models"],
};

export const skills = [
  { group: "Languages", items: ["Swift", "JavaScript", "Python", "Java", "C", "SQL (Postgres, SQLite)", "MIPS Assembly", "HTML/CSS"] },
  { group: "Mobile", items: ["SwiftUI", "MapKit", "SwiftData", "Foundation Models", "MVVM", "Repository Pattern", "Dependency Injection"] },
  { group: "Web", items: ["React", "Next.js", "Vite", "Zustand", "TailwindCSS", "shadcn/ui", "Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "WebGL"] },
  { group: "Cloud", items: ["Cloudflare Workers", "D1", "Durable Objects", "Cron Triggers", "Wrangler", "Vercel"] },
  { group: "Data & ML", items: ["PyTorch", "Transformers", "DistilBERT", "GloVe", "scikit-learn", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "Reverse engineering", items: ["Unity IL2CPP / HybridCLR", "Il2CppDumper", "ILSpy", "Binary table decoding", "Asset extraction"] },
  { group: "Tools", items: ["Git", "Xcode", "Postman", "Vitest", "SignalR", "JWT Authentication", "Command Line"] },
];

export const education = [
  {
    school: "Lebanese American University",
    degree: "B.S. in Computer Science",
    period: "Oct 2024 – Expected June 2027",
    place: "Jbeil, Lebanon",
    notes: ["LAU Honor List", "50% SAT Merit Scholarship"],
  },
  {
    school: "SSCC Kfarhbab",
    degree: "French Baccalaureate",
    period: "2011 – 2024",
    place: "Ghazir, Lebanon",
    notes: [],
  },
];

export const coursework = [
  "Algorithms and Data Structures",
  "Operating Systems",
  "Computer Organization",
  "Object-Oriented Programming",
  "Software Engineering",
  "Database Management Systems",
  "Discrete Structures",
  "Introduction to Artificial Intelligence",
];

export const activity =
  "Semicolon Academy CTF (2024), competed as a two-person LAU team.";
