import { skills } from "../data.js";
import { Section } from "./ui.jsx";

export default function Skills() {
  return (
    <Section id="skills" label="Skills" title="What I work with">
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((skill) => (
          <div
            key={skill.group}
            className="grid gap-2 py-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8"
          >
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:pt-1">
              {skill.group}
            </dt>
            <dd className="leading-relaxed">{skill.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
