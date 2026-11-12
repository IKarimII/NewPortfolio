// Small building blocks shared by every section.

export function Section({ id, label, title, children }) {
  return (
    <section id={id} className="border-t border-line py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}

export function Stack({ items }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Points({ items }) {
  return (
    <ul className="space-y-3 text-[0.95rem] leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
