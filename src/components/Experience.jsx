import { experience } from "../data.js";
import { Points, Section, Stack } from "./ui.jsx";

export default function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
      <article className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {experience.role}
          </h3>
          <p className="mt-1 text-lg font-medium text-accent">
            {experience.company}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
            {experience.period}
            <br />
            {experience.place}
          </p>
        </div>
        <div className="space-y-6">
          <p className="leading-relaxed">{experience.summary}</p>
          <Points items={experience.points} />
          <Stack items={experience.stack} />
        </div>
      </article>
    </Section>
  );
}
