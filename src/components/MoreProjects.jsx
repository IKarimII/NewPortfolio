import { moreProjects } from "../data.js";
import { ExternalLink, Section, Stack } from "./ui.jsx";

export default function MoreProjects() {
  return (
    <Section id="more" label="More projects" title="Research and side builds">
      <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {moreProjects.map((project) => (
          <li key={project.name} className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {project.tag}
            </p>
            <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
            <p className="text-[0.95rem] leading-relaxed text-muted">
              {project.summary}
            </p>
            <Stack items={project.stack} />
            {project.href && (
              <ExternalLink href={project.href} className="text-sm">
                Source on GitHub
              </ExternalLink>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
