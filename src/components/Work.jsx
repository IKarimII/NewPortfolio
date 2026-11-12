import { featured, projects } from "../data.js";
import { ExternalLink, Points, Section, Stack } from "./ui.jsx";

function Shot({ image, className = "" }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width="1600"
      height="1000"
      loading="lazy"
      decoding="async"
      className={`aspect-[16/10] w-full rounded-lg border border-line object-cover object-top ${className}`}
    />
  );
}

function Featured() {
  const [main, ...rest] = featured.images;

  return (
    <article>
      <div className="grid gap-3 sm:grid-cols-3">
        <Shot image={main} className="sm:col-span-2 sm:row-span-2" />
        {rest.map((image) => (
          <Shot key={image.src} image={image} />
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <p className="font-mono text-xs text-muted">
            {featured.period} · {featured.note}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {featured.name}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{featured.summary}</p>
          <ExternalLink href={featured.href} className="mt-5">
            {featured.linkLabel}
          </ExternalLink>

          <dl className="mt-8 grid grid-cols-4 gap-4 border-t border-line pt-6">
            {featured.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-xs text-muted">
            {featured.statsNote}
          </p>
        </div>

        <div className="space-y-6">
          <Points items={featured.points} />
          <Stack items={featured.stack} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="flex flex-col">
      {project.image ? (
        <Shot image={project.image} />
      ) : (
        // No screenshot yet: show the project's address as a plate instead.
        <div
          aria-hidden="true"
          className="grid aspect-[16/10] w-full place-items-center rounded-lg border border-line bg-surface p-6"
        >
          <span className="font-display text-[clamp(1.5rem,5vw,2.75rem)] font-extrabold tracking-tight text-accent">
            {project.linkLabel}
          </span>
        </div>
      )}
      <p className="mt-6 font-mono text-xs text-muted">{project.period}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {project.name}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-5 space-y-5">
        <Points items={project.points} />
        <Stack items={project.stack} />
        <ExternalLink href={project.href}>{project.linkLabel}</ExternalLink>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <Section id="work" label="Selected work" title="Things I've shipped">
      <Featured />
      <div className="mt-16 grid gap-x-10 gap-y-16 border-t border-line pt-16 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
