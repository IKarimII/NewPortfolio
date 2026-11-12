import { profile } from "../data.js";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          Karim Hawwa
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
          >
            CV
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
