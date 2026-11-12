import { pad } from "./format.js";

export default function ProjectCard({ project, index, tabbable, onOpen }) {
  return (
    <button
      type="button"
      className="projects-card"
      data-project-index={index}
      tabIndex={tabbable ? 0 : -1}
      aria-haspopup="dialog"
      aria-label={`View ${project.name}`}
      onClick={(e) => onOpen(index, e.currentTarget)}
    >
      <span className="projects-card__media">
        <img
          className="projects-card__img"
          src={project.image}
          alt=""
          style={{ objectPosition: project.imagePosition ?? "top" }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="projects-card__shade" />

      <span className="projects-card__top">
        <span className="projects-card__index">{pad(index)}</span>
        <span className="projects-card__cta">
          View project <span className="projects-card__cta-arrow">→</span>
        </span>
      </span>

      <span className="projects-card__body">
        <span className="projects-card__title">{project.name}</span>
        <span className="projects-card__tagline">{project.tagline}</span>
        {project.period ? (
          <span className="projects-card__period">{project.period}</span>
        ) : null}
        <span className="projects-card__chips">
          <span className="projects-card__chips-inner">
            {project.stack.slice(0, 4).map((item) => (
              <span key={item} className="projects-chip">
                {item}
              </span>
            ))}
          </span>
        </span>
      </span>
    </button>
  );
}
