import kansteinImg from "../assets/projects/kanstein.webp";
import shipitImg from "../assets/projects/shipit.webp";
import techfinderImg from "../assets/projects/techfinder.webp";
import researchImg from "../assets/projects/research.webp";
import messageboardImg from "../assets/projects/messageboard.webp";
import aiCodeReviewerImg from "../assets/projects/aicode.webp";
import dodgeyCubeImg from "../assets/projects/dodgeycube.png";

// `imagePosition` is the object-position used when a screenshot is cropped
// into the 4:3 card / detail frame (defaults to the top of the image).
export const PROJECTS = [
  {
    name: "Kanstein Almanac",
    tagline: "Companion platform for Sword x Staff",
    period: "Oct 2026 – Present",
    note: "In collaboration with Boltray Games",
    href: "https://kanstein.xyz",
    linkLabel: "Visit site",
    image: kansteinImg,
    imagePosition: "left top",
    summary:
      "Companion platform for the mobile RPG Sword x Staff using the studio's official art: character planner, gacha simulator, interactive map, wiki and a live server calendar.",
    stats: [
      { value: "90K+", label: "Requests" },
      { value: "9K+", label: "Page views" },
      { value: "60+", label: "Countries" },
      { value: "54", label: "Releases" },
    ],
    statsCaption: "First three weeks",
    highlights: [
      "Reverse-engineered the game's Unity client (IL2CPP / HybridCLR assemblies, Luban config tables, Spine rigs) with a 70-script Python toolchain producing typed, versioned datasets.",
      "Serverless backend on Cloudflare Workers + D1: email-verified accounts, PBKDF2 hashing, session auth, public profiles and cron cleanup.",
      "Real-time chat over WebSockets on Durable Objects (hibernation API), one hub per channel.",
      "Animated, customizable characters with Spine WebGL, 65 Vitest suites and prerendered pages for SEO.",
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
  },
  {
    name: "ShipIt",
    tagline: "AI-powered store builder for merchants",
    period: "2026",
    href: "https://shipit-dusky-one.vercel.app/",
    linkLabel: "Live demo",
    image: shipitImg,
    imagePosition: "left top",
    summary:
      "Co-built full-stack, AI-powered multi-tenant e-commerce SaaS that lets merchants generate and manage online stores without writing code.",
    highlights: [
      "Express/MongoDB backend with JWT auth, bcrypt, role-based access control, middleware guards and Upstash Redis rate limiting.",
      "OpenAI and Groq generate and modify storefront configuration JSON from natural-language prompts.",
      "React 19 + Vite frontend with Zustand and a visual store editor with drag-and-drop sections and live preview.",
    ],
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "React 19",
      "Vite",
      "Zustand",
      "TailwindCSS",
      "OpenAI",
      "Groq",
      "Redis",
    ],
  },
  {
    name: "TechFinder",
    tagline: "Tech prices across Lebanese retailers",
    period: "2026",
    href: "https://techfinderlb.space",
    linkLabel: "Visit site",
    image: techfinderImg,
    imagePosition: "left top",
    summary:
      "Price comparison platform for tech products across Lebanese retailers, normalising VAT-inclusive pricing so every product is compared on the same terms.",
    highlights: [
      "FastAPI backend with async SQLAlchemy 2.0 + PostgreSQL and an append-only price-history table that records changes only when prices move.",
      "Ingestion adapters for WooCommerce, Shopify and JSON-LD storefronts (minor-unit integer prices, HTML-encoded names).",
      "Next.js + React 19 frontend on Cloudflare with SSR, structured JSON-LD and a sitemap.",
    ],
    stack: [
      "Next.js",
      "React",
      "TailwindCSS",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Alembic",
      "Python",
    ],
  },
  {
    name: "Role Classification (Research)",
    tagline: "Classifying learners, teachers and trolls",
    note: "Co-authored research paper",
    image: researchImg,
    imagePosition: "center",
    summary:
      "Co-authored paper classifying discussion participants as learner, teacher or troll on a balanced 15,000-sample dataset.",
    stats: [
      { value: "0.99", label: "F1-score" },
      { value: "15,000", label: "Samples" },
      { value: "3", label: "Roles" },
    ],
    highlights: [
      "Benchmarked TF-IDF + Logistic Regression and TextCNN against fine-tuned DistilBERT (0.99 F1).",
      "Error analysis of cross-corpus domain shift.",
    ],
    stack: ["PyTorch", "Transformers", "DistilBERT", "GloVe", "TF-IDF"],
  },
  {
    name: "MessageBoard",
    tagline: "Full-stack board with secure auth",
    href: "https://github.com/IKarimII/TheMessageBoard",
    linkLabel: "Source on GitHub",
    image: messageboardImg,
    imagePosition: "left top",
    summary:
      "Full-stack message board with authentication and account flows built end to end.",
    highlights: [
      "JWT authentication via HTTP-only cookies and protected routes.",
      "Email verification and password reset via Resend.",
      "Upstash Redis rate limiting.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "React", "Vite", "TailwindCSS", "JWT"],
  },
  {
    name: "AICodeReviewer",
    tagline: "Structured AI code review feedback",
    href: "https://github.com/IKarimII/AICodeReviewer",
    linkLabel: "Source on GitHub",
    image: aiCodeReviewerImg,
    summary: "AI code review tool generating structured feedback on submitted code.",
    highlights: [
      "Structured review feedback from an AI model.",
      "Validated JSON parsing of model output.",
      "Graceful fallback on malformed model output.",
    ],
    stack: ["Express", "React", "Vite", "OpenRouter"],
  },
  {
    name: "DodgyCube",
    tagline: "Arcade dodge-and-collect game in MIPS",
    href: "https://github.com/IKarimII/DodgeyCube",
    linkLabel: "Source on GitHub",
    image: dodgeyCubeImg,
    imagePosition: "center",
    summary:
      "Arcade-style dodge-and-collect game written entirely in MIPS Assembly.",
    highlights: [
      "Hand-written bitmap renderer.",
      "Collision detection.",
      "Health and score systems.",
    ],
    stack: ["MIPS Assembly", "MARS Bitmap Display"],
  },
];
