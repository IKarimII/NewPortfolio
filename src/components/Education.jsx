import { activity, coursework, education } from "../data.js";
import { Section } from "./ui.jsx";

export default function Education() {
  return (
    <Section id="education" label="Education" title="Where I've studied">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
        <ul className="space-y-10">
          {education.map((entry) => (
            <li key={entry.school}>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                {entry.school}
              </h3>
              <p className="mt-1 font-medium text-accent">{entry.degree}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {entry.period} · {entry.place}
              </p>
              {entry.notes.length > 0 && (
                <p className="mt-3 text-[0.95rem] text-muted">
                  {entry.notes.join(" · ")}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted">
              Relevant coursework
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed">
              {coursework.join(" · ")}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted">
              Activities
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed">{activity}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
