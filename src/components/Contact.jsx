import { profile } from "../data.js";
import { ExternalLink } from "./ui.jsx";

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Get in touch
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-display text-[clamp(1.5rem,5.5vw,3.5rem)] font-extrabold tracking-tight underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {profile.links.map((link) => (
            <li key={link.label}>
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            </li>
          ))}
          <li>
            <ExternalLink href={profile.cv}>Download CV</ExternalLink>
          </li>
        </ul>
        <p className="mt-16 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
