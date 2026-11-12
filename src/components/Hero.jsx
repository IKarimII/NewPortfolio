import { profile } from "../data.js";

export default function Hero() {
  return (
    <section id="top" className="py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        Software engineer
      </p>
      <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
        I build for iOS, the web and the edge.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        I&apos;m Karim, a computer science student at the Lebanese American
        University. This year I shipped a native iOS app during my internship
        at CME and launched Kanstein Almanac, a companion platform for a mobile
        RPG that reached players in more than 60 countries in three weeks.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
        >
          See my work
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-ink"
        >
          {profile.email}
        </a>
      </div>

      <dl className="mt-16 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {profile.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {fact.label}
            </dt>
            <dd className="mt-2 text-[0.95rem] font-medium leading-snug">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
